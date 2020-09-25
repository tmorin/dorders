import {Containers, StartOptions} from '@dorders/infra-test';
import {ConsoleLogger, Level} from '@dorders/infra-logger-console';
import {Container, Module} from '@dorders/framework';
import {ModelContactModule} from '@dorders/model-contact';
import {InfraContactModule} from '../InfraContactModule';
import {ModelProfileModule} from '@dorders/model-profile';
import {InfraProfileModule} from '@dorders/impl-demo-profile';

ConsoleLogger.DEFAULT_LEVEL = Level.warn;

export class DemoContainers extends Containers {

  constructor(instances?: Array<Container>) {
    super(instances);
  }

  static async create(
    numbers: number,
    options: Partial<StartOptions> = {},
    modulesFactory: () => Array<Module> = () => ([])
  ) {
    const containers = new DemoContainers();
    await containers.startDemoContainers(numbers, options);
    return containers;
  }

  startDemoContainers(
    numbers: number,
    options?: Partial<StartOptions>
  ): Promise<Array<Container>> {
    return this.startContainers(numbers, options, () => ([
      new ModelProfileModule(), new InfraProfileModule(),
      new ModelContactModule(), new InfraContactModule(),
    ]));
  }

}
