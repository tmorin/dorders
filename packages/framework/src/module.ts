import {MessageBus, MessageBusSymbol} from './bus';
import {LoggerFactory, LoggerFactorySymbol} from './logger';
import {ConfigProvider, ConfigProviderSymbol} from './config';
import {Registry} from './registry';

export interface ModuleConfiguration {
  registry: Registry
}

export interface Module {
  initialize(configuration: ModuleConfiguration): Promise<void>

  dispose(): Promise<void>
}


export interface ConfigurableModule {
  registry: Registry

  setMessageBus(messageBus: MessageBus): this

  setLoggerFactory(loggerFactory: LoggerFactory): this

  setConfigProvider(configProvider: ConfigProvider): this

  configure(this: ConfigurableModule): Promise<void>
}

export abstract class AbstractModule implements Module, ConfigurableModule {

  private configuration: ModuleConfiguration

  get registry(): Registry {
    return this.configuration.registry;
  }

  async initialize(configuration: ModuleConfiguration): Promise<void> {
    this.configuration = configuration;
    await this.configure();
  }

  abstract configure(this: ConfigurableModule): Promise<void>

  async dispose(): Promise<void> {
  }

  async getConfiguration(): Promise<ModuleConfiguration> {
    return {
      registry: this.configuration.registry
    }
  }

  setMessageBus(messageBus: MessageBus): this {
    this.registry.registerValue(MessageBusSymbol, messageBus);
    return this;
  }

  setLoggerFactory(loggerFactory: LoggerFactory): this {
    this.registry.registerValue(LoggerFactorySymbol, loggerFactory);
    return this;
  }

  setConfigProvider(configProvider: ConfigProvider): this {
    this.registry.registerValue(ConfigProviderSymbol, configProvider);
    return this;
  }

}

export class OnlyConfigureModule extends AbstractModule {
  constructor(private readonly _configure: (this: ConfigurableModule) => Promise<void>) {
    super();
  }

  static create(cb: (this: ConfigurableModule) => Promise<void>) {
    return new OnlyConfigureModule(cb);
  }

  async configure(): Promise<void> {
    await this._configure.apply(this)
  }
}
