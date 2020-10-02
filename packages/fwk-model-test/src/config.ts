import {AbstractModule, Config, ConfigProvider, ConfigProviderSymbol} from '@dorders/fwk-model-core';

export const ConfigsTestProviderSymbol = Symbol.for('test/ConfigsTestProvider');

export abstract class ConfigsTestProvider {

  abstract provide(index: number): Promise<Map<symbol, Config>>

}

export class DefaultConfigsTestProvider extends ConfigsTestProvider {

  async provide(index: number): Promise<Map<symbol, DefaultConfigsTestProvider>> {
    return new Map();
  }

}

export class ConfigsTestProviderModule extends AbstractModule {

  constructor(
    private readonly index: number,
    private readonly verbose: boolean = false
  ) {
    super();
  }

  async configure(): Promise<void> {
    const configProvider = this.registry.resolve<ConfigProvider>(ConfigProviderSymbol);
    const configsTestProviders = this.registry.resolveAll<ConfigsTestProvider>(ConfigsTestProviderSymbol);
    for (const configsTestProvider of configsTestProviders) {
      const configs = await configsTestProvider.provide(this.index);
      for (const [scope, config] of configs.entries()) {
        if (this.verbose) {
          console.debug('ConfigsTestProvider - index (%s) - patch config (%s) %o', this.index, scope, config);
        }
        await configProvider.patch(scope, config);
      }
    }
  }

}
