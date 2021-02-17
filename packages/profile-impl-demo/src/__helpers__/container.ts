import {ConsoleLogger, Level} from '@tmorin/ddd-fwk-infra-logger-console';
import {ModelProfileModule} from '@dorders/profile-model';
import {InfraProfileModule} from '../';
import {Container, Module} from '@tmorin/ddd-fwk-model-core';
import {FwkInfraTestContainers} from '@tmorin/ddd-fwk-infra-test';
import {StartOptions} from '@tmorin/ddd-fwk-model-test';

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
      new ModelProfileModule(), new InfraProfileModule(),
    ]));
  }

}
