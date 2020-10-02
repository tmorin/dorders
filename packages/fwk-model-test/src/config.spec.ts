import {ConfigsTestProviderModule, ConfigsTestProviderSymbol, DefaultConfigsTestProvider} from './config';
import {
  ConfigProvider,
  ConfigProviderSymbol,
  ContainerBuilder,
  LoggerFactorySymbol,
  MessageBusSymbol,
  OnlyConfigureModule
} from '@dorders/fwk-model-core';
import {DummyConfigsTestProvider} from './__helpers__/DummyConfigsTestProvider';

describe('config', function () {
  it('should patch', async function () {
    const mocks = {
      patch() {
      }
    };
    const patchSpy = jest.spyOn(mocks, 'patch');
    const configsTestProviderModule = new ConfigsTestProviderModule(0, true);
    const container = ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        this.registry.registerValue(LoggerFactorySymbol, mocks);
        this.registry.registerValue(MessageBusSymbol, mocks);
        this.registry.registerValue(ConfigProviderSymbol, mocks);
        this.registry.registerValue(ConfigsTestProviderSymbol, new DummyConfigsTestProvider())
      }))
      .module(configsTestProviderModule)
      .build();
    await container.initialize();
    container.registry.resolve<ConfigProvider>(ConfigProviderSymbol);
    expect(patchSpy).toHaveBeenCalled();
  });
})
