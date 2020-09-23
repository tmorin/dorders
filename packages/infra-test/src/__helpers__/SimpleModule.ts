import {AbstractModule} from '@dorders/framework';

export class SimpleModule extends AbstractModule {
  async configure(): Promise<void> {
    this.registry.registerValue('key', 'value');
  }
}
