import rimraf from 'rimraf';
import {ConfigProvider, Container, ContainerBuilder, LoggerFactory, MessageBus, Module} from '@dorders/framework';
import {waitFor} from './utils';
import {InfraTestModule} from './InfraTestModule';
import {ConfigsTestProviderModule} from './config';

export type StartOptions = {
  clean: boolean
  verbose: boolean
  loggerFactory?: LoggerFactory
  configProvider?: ConfigProvider
  messageBus?: MessageBus
}

export class Containers {

  constructor(
    public readonly instances: Array<Container> = []
  ) {
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
      .module(new InfraTestModule(options.configProvider, options.loggerFactory, options.messageBus))
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
        Object.assign({}, options),
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
