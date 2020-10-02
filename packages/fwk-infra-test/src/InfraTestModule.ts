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
} from '@dorders/fwk-model-core';
import {InMemoryConfigProvider} from '@dorders/fwk-infra-config-inmemory';
import {LocalMessageBus} from '@dorders/fwk-infra-bus-local';
import {ConsoleLoggerFactory} from '@dorders/fwk-infra-logger-console';
import {ConfigsTestProviderSymbol, DefaultConfigsTestProvider} from '@dorders/fwk-model-test';

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
