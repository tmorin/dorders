import rimraf from 'rimraf';
import {Container, ContainerBuilder, Module} from '@dorders/fwk-model-core';
import {InfraTestModule} from './InfraTestModule';
import {ConfigsTestProviderModule, Containers, StartOptions, waitFor} from '@dorders/fwk-model-test';

export class FwkInfraTestContainers implements Containers {

  constructor(
    public readonly instances: Array<Container> = []
  ) {
  }

  static async create(
    numbers: number = 0,
    options: Partial<StartOptions> = {},
    modulesFactory: () => Array<Module> = () => ([])
  ): Promise<FwkInfraTestContainers> {
    const containers = new FwkInfraTestContainers();
    await containers.startContainers(numbers, options, modulesFactory);
    return containers;
  }

  async startContainer(
    index: number,
    options: Partial<StartOptions> = {},
    modulesFactory: () => Array<Module> = () => ([])
  ): Promise<Container> {
    const opt: StartOptions = {
      clean: true,
      verbose: false,
      ...options
    }

    if (opt.verbose) {
      console.debug('start container (%s) with options (%o)', index, opt);
    }

    if (opt.clean) {
      if (opt.verbose) {
        console.debug('clean container (%s)', index);
      }
      rimraf.sync(`tmp/container-${index}`);
    }

    return ContainerBuilder.create()
      .name(opt.name)
      .module(new InfraTestModule())
      .modules(modulesFactory())
      .module(new ConfigsTestProviderModule(index, opt.verbose))
      .build()
      .initialize();
  }

  async startContainers(
    numbers: number,
    options: Partial<StartOptions> = {},
    modulesFactory: () => Array<Module> = () => ([])
  ): Promise<Array<Container>> {
    const result: Array<Container> = [];
    const from = this.instances.length;
    const to = from + numbers;
    for (let index = from; index < to; index++) {
      const container = await this.startContainer(
        index,
        {...options, name: `container-${index}`},
        modulesFactory
      );
      this.instances.push(container);
      result.push(container)
    }
    return result;
  }

  async disposeContainer(index: number) {
    const container = this.instances.splice(index, 1)[0];
    await container.dispose();
  }

  async disposeContainers(
    waitForBefore: number = 0,
    waitForBetween: number = 0,
    waitForAfter: number = 0
  ) {
    await waitFor(waitForBefore);
    while (this.instances.length > 0) {
      await this.disposeContainer(0);
      await waitFor(waitForBetween);
    }
    await waitFor(waitForAfter);
  }

}
