import {ConsoleLogger, Level} from '@tmorin/ddd-fwk-infra-logger-console';
import {Container} from '@tmorin/ddd-fwk-model-core';
import {ModelContactModule} from '@dorders/contact-model';
import {InfraContactModule} from '../InfraContactModule';
import {ModelProfileModule} from '@dorders/profile-model';
import {InfraProfileModule} from '@dorders/profile-impl-demo';
import {ModelPeerModule} from '@dorders/peer-model';
import {InfraPeerModule} from '@dorders/peer-impl-demo';
import {FwkInfraTestContainers} from '@tmorin/ddd-fwk-infra-test';
import {StartOptions} from '@tmorin/ddd-fwk-model-test';

ConsoleLogger.DEFAULT_LEVEL = Level.warn;

export class DemoContainers extends FwkInfraTestContainers {

  constructor(instances?: Array<Container>) {
    super(instances);
  }

  static async create(
    numbers: number = 0,
    options: Partial<StartOptions> = {}
  ): Promise<DemoContainers> {
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
      new ModelProfileModule(), new InfraProfileModule(),
      new ModelContactModule(), new InfraContactModule(),
    ]));
  }

}
