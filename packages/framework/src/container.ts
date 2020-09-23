import {Module, ModuleConfiguration} from './module';
import {DefaultRegistry, Registry} from './registry';
import {MessageBus, MessageBusSymbol} from './bus';
import {LoggerFactory, LoggerFactorySymbol} from './logger';
import {ConfigProvider, ConfigProviderSymbol} from './config';
import {CommandHandler, CommandHandlerSymbol, CommandName} from './command';
import {QueryHandler, QueryHandlerSymbol, QueryName} from './query';
import {EventListener, EventListenerSymbol, EventName} from './event';
import {Component, ComponentSymbol} from './component';

function assert(value: () => any) {
  try {
    value();
  } catch (e) {
    throw new Error(`the container configuration is not valid: ${e.message}`)
  }
}

export class Container {

  constructor(
    public readonly registry: Registry = new DefaultRegistry(),
    private readonly modules: Array<Module> = [],
    private readonly configuration: ModuleConfiguration = {
      registry: registry
    }
  ) {
  }

  get messageBus() {
    return this.registry.resolve<MessageBus>(MessageBusSymbol);
  }

  get loggerFactory() {
    return this.registry.resolve<LoggerFactory>(LoggerFactorySymbol);
  }

  get configProvider() {
    return this.registry.resolve<ConfigProvider>(ConfigProviderSymbol);
  }

  async initialize(): Promise<this> {
    for (const module of this.modules) {
      await module.initialize(this.configuration);
    }
    this.validateConfiguration();

    if (this.registry.contains(CommandHandlerSymbol)) {
      const commandHandlers = this.registry.resolveAll<CommandHandler>(CommandHandlerSymbol);
      for (const commandHandler of commandHandlers) {
        if (commandHandler['__fwkHandledCommandNames']) {
          const names: Array<CommandName> = commandHandler['__fwkHandledCommandNames'];
          for (const name of names) {
            this.messageBus.registerCommandHandler(name, commandHandler);
          }
        }
      }
    }

    if (this.registry.contains(QueryHandlerSymbol)) {
      const queryHandlers = this.registry.resolveAll<QueryHandler>(QueryHandlerSymbol);
      for (const queryHandler of queryHandlers) {
        if (queryHandler['__fwkHandledQueryNames']) {
          const names: Array<QueryName> = queryHandler['__fwkHandledQueryNames'];
          for (const name of names) {
            this.messageBus.registerQueryHandler(name, queryHandler);
          }
        }
      }
    }

    if (this.registry.contains(EventListenerSymbol)) {
      const eventListeners = this.registry.resolveAll<EventListener>(EventListenerSymbol);
      for (const eventListener of eventListeners) {
        if (eventListener['__fwkHandledEventNames']) {
          const names: Array<EventName> = eventListener['__fwkHandledEventNames'];
          for (const name of names) {
            this.messageBus.on(name, eventListener.listen.bind(eventListener));
          }
        }
      }
    }

    if (this.registry.contains(ComponentSymbol)) {
      const components = this.registry.resolveAll<Component>(ComponentSymbol);
      for (const component of components) {
        await component.configure();
      }
    }

    return this;
  }

  async dispose() {
    if (this.registry.contains(ComponentSymbol)) {
      const components = this.registry.resolveAll<Component>(ComponentSymbol);
      const reversedComponents = [...components].reverse();
      for (const component of reversedComponents) {
        await component.dispose();
      }
    }

    const reversedNodules = [...this.modules].reverse();
    for (const module of reversedNodules) {
      await module.dispose();
    }
  }

  private validateConfiguration() {
    assert(() => this.messageBus);
    assert(() => this.loggerFactory);
    assert(() => this.configProvider);
  }

}

export class ContainerBuilder {

  constructor(
    private readonly _modules: Array<Module> = [],
    private _registry: Registry = new DefaultRegistry()
  ) {
  }

  static create(modules: Array<Module> = []) {
    return new ContainerBuilder(modules);
  }

  registry(registry: Registry) {
    this._registry = registry;
    return this;
  }

  module(...modules: Array<Module>) {
    for (const module of modules) {
      this._modules.push(module);
    }
    return this;
  }

  modules(modules: Array<Module>) {
    for (const module of modules) {
      this._modules.push(module);
    }
    return this;
  }

  build(): Container {
    return new Container(this._registry, this._modules)
  }

}
