import {ModelPeerModule} from '@dorders/model-peer';
import {ConsoleLogger, Level} from '@dorders/infra-logger-console';
import {Container, Module} from '@dorders/fwk-model-core';
import {InfraPeerModule} from '../';
import {FwkInfraTestContainers} from '@dorders/infra-test';
import {StartOptions} from '@dorders/fwk-model-test';

ConsoleLogger.DEFAULT_LEVEL = Level.warn;

export class DemoContainers extends FwkInfraTestContainers {

  constructor(instances?: Array<Container>) {
    super(instances);
  }

  static async create(
    numbers: number = 0,
    options: Partial<StartOptions> = {},
    modulesFactory: () => Array<Module> = () => ([])
  ) {
    const containers = new DemoContainers();
    await containers.startContainers(numbers, options);
    return containers;
  }

  startContainers(
    numbers: number,
    options?: Partial<StartOptions>
  ): Promise<Array<Container>> {
    return super.startContainers(numbers, options, () => ([
      new ModelPeerModule(), new InfraPeerModule(),
    ]));
  }

}
