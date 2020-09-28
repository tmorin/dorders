import {
  AbstractModule,
  ConfigProvider,
  ConfigProviderSymbol,
  Container,
  ContainerSymbol,
  LoggerFactory,
  LoggerFactorySymbol,
  MessageBus,
  MessageBusSymbol
} from '@dorders/framework';
import {InMemoryConfigProvider} from '@dorders/infra-config-inmemory';
import {LocalMessageBus} from '@dorders/infra-bus-local';
import {ConfigsTestProviderSymbol, DefaultConfigsTestProvider} from './config';
import {ConsoleLoggerFactory} from '@dorders/infra-logger-console';

export class InfraTestModule extends AbstractModule {

  async configure(): Promise<void> {

    this.registry.registerFactory<ConfigProvider>(ConfigProviderSymbol, () => new InMemoryConfigProvider(), {singleton: true});

    this.registry.registerFactory<LoggerFactory>(LoggerFactorySymbol, registry => new ConsoleLoggerFactory(
      registry.resolve<Container>(ContainerSymbol)
    ), {singleton: true});

    this.registry.registerFactory<MessageBus>(MessageBusSymbol, registry => new LocalMessageBus(
      registry.resolve<LoggerFactory>(LoggerFactorySymbol)
    ), {singleton: true});

    this.registry.registerValue(ConfigsTestProviderSymbol, new DefaultConfigsTestProvider())
  }

  async dispose(): Promise<void> {
    await this.registry.resolve<MessageBus>(MessageBusSymbol).dispose();
  }
}
