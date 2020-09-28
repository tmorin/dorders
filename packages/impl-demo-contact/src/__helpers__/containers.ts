import {Containers, StartOptions} from '@dorders/infra-test';
import {ConsoleLogger, Level} from '@dorders/infra-logger-console';
import {Container} from '@dorders/framework';
import {ModelContactModule} from '@dorders/model-contact';
import {InfraContactModule} from '../InfraContactModule';
import {ModelProfileModule} from '@dorders/model-profile';
import {InfraProfileModule} from '@dorders/impl-demo-profile';
import {ModelPeerModule} from '@dorders/model-peer';
import {InfraPeerModule} from '@dorders/impl-demo-peer';

ConsoleLogger.DEFAULT_LEVEL = Level.warn;

export class DemoContainers extends Containers {

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
