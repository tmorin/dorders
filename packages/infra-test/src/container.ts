import {Container, Module} from '@dorders/framework';
import {Containers, StartOptions} from './containers';

const CONTAINERS = new Containers();

export function getRunningContainers() {
  return CONTAINERS.instances;
}

export async function startContainers(
  numbers: number,
  options: Partial<StartOptions> = {},
  modulesFactory: () => Array<Module> = () => ([])
): Promise<Array<Container>> {
  return CONTAINERS.startContainers(numbers, options, modulesFactory);
}

export async function disposeContainer(index: number) {
  await CONTAINERS.disposeContainer(index);
}

export async function disposeContainers(
  waitForBefore: number = 0,
  waitForBetween: number = 0,
  waitForAfter: number = 0
) {
  await CONTAINERS.disposeContainers(waitForBefore, waitForBetween, waitForAfter);
}
