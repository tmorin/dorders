import {Container, Module} from '@dorders/fwk-model-core';
import {Containers, StartOptions} from '../containers';

export class DummyContainers implements Containers {
  disposeContainer(index: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  disposeContainers(waitForBefore?: number, waitForBetween?: number, waitForAfter?: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  startContainer(index: number, options?: Partial<StartOptions>, modulesFactory?: () => Array<Module>): Promise<Container> {
    return Promise.resolve(undefined);
  }

  startContainers(numbers: number, options?: Partial<StartOptions>, modulesFactory?: () => Array<Module>): Promise<Array<Container>> {
    return Promise.resolve(undefined);
  }
}
