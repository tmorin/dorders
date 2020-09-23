import {AbstractModule, ConfigProvider, LoggerFactory, MessageBus} from '@dorders/framework';
import {InMemoryConfigProvider} from '@dorders/infra-config-inmemory';
import {LocalMessageBus} from '@dorders/infra-bus-local';
import {ConfigsTestProviderSymbol, DefaultConfigsTestProvider} from './config';
import {ConsoleLoggerFactory} from '@dorders/infra-logger-console';

export class InfraTestModule extends AbstractModule {

  constructor(
    private readonly _configProvider: ConfigProvider = new InMemoryConfigProvider(),
    private readonly _loggerFactory: LoggerFactory = new ConsoleLoggerFactory(),
    private readonly _messageBus: MessageBus = new LocalMessageBus(_loggerFactory),
  ) {
    super();
  }

  async configure(): Promise<void> {
    this.setConfigProvider(this._configProvider);
    this.setLoggerFactory(this._loggerFactory);
    this.setMessageBus(this._messageBus);
    this.registry.registerValue(ConfigsTestProviderSymbol, new DefaultConfigsTestProvider())
  }

  async dispose(): Promise<void> {
    await this._messageBus.dispose();
  }
}
