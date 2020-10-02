import {ConfigsTestProvider} from '../config';
import {Config} from '@dorders/fwk-model-core';

export const DummyScope = Symbol.for('dummy')

export class DummyConfigsTestProvider implements ConfigsTestProvider {

  constructor(
    public map: Map<symbol, Config> = new Map()
  ) {
    map.set(DummyScope, {
      dummyKey: 'dummy value'
    })
  }

  async provide(index: number): Promise<Map<symbol, Config>> {
    return this.map;
  }
}
