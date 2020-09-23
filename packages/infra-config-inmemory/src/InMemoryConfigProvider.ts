import defaultsdeep from 'lodash.defaultsdeep';
import {Config, ConfigProvider, ConfigScope} from '@dorders/framework';

export class InMemoryConfigProvider implements ConfigProvider {

  constructor(
    private readonly map: Map<ConfigScope, any> = new Map(),
  ) {
  }

  get<C extends Config>(scope: ConfigScope, def?: any): C {
    if (this.map.has(scope)) {
      return this.map.get(scope);
    }
    return def;
  }

  async patch<C extends Config>(scope: ConfigScope, config: Partial<C>): Promise<void> {
    const actualConfig = await this.get(scope, {});
    const newConfig = defaultsdeep({}, config, actualConfig);
    this.map.set(scope, newConfig);
  }

}
