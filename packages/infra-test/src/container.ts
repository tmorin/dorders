import rimraf from 'rimraf';
import {ConfigProvider, Container, ContainerBuilder, LoggerFactory, MessageBus, Module} from '@dorders/framework';
import {ConfigsTestProviderModule} from './config';
import {InfraTestModule} from './InfraTestModule';
import {waitFor} from './utils';

const RUNNING_CONTAINERS: Array<Container> = [];

export function getRunningContainers() {
  return RUNNING_CONTAINERS;
}

export type CreateOptions = {
  clean: boolean
  verbose: boolean
  loggerFactory?: LoggerFactory
  configProvider?: ConfigProvider
  messageBus?: MessageBus
}

async function startContainer(
  index: number,
  options: Partial<CreateOptions> = {},
  modulesFactory: () => Array<Module> = () => ([])
): Promise<Container> {
  const opt: CreateOptions = {
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

export async function startContainers(
  numbers: number,
  options: Partial<CreateOptions> = {},
  modulesFactory: () => Array<Module> = () => ([])
): Promise<Array<Container>> {
  const result: Array<Container> = [];
  const from = RUNNING_CONTAINERS.length;
  const to = from + numbers;
  for (let index = from; index < to; index++) {
    const container = await startContainer(
      index,
      Object.assign({}, options),
      modulesFactory
    );
    RUNNING_CONTAINERS.push(container);
    result.push(container)
  }
  return result;
}

export async function disposeContainer(index: number) {
  const container = RUNNING_CONTAINERS.splice(index, 1)[0];
  await container.dispose();
}

export async function disposeContainers(
  waitForBefore: number = 0,
  waitForBetween: number = 0,
  waitForAfter: number = 0
) {
  await waitFor(waitForBefore);
  while (RUNNING_CONTAINERS.length > 0) {
    await disposeContainer(0);
    await waitFor(waitForBetween);
  }
  await waitFor(waitForAfter);
}
