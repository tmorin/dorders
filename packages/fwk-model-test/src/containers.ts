import {Container, Module} from '@dorders/fwk-model-core/lib';

export type StartOptions = {
  name?: string
  clean: boolean
  verbose: boolean
}

export interface Containers {

  startContainer(
    index: number,
    options?: Partial<StartOptions>,
    modulesFactory?: () => Array<Module>
  ): Promise<Container>

  startContainers(
    numbers: number,
    options?: Partial<StartOptions>,
    modulesFactory?: () => Array<Module>
  ): Promise<Array<Container>>

  disposeContainer(
    index: number
  ): Promise<void>

  disposeContainers(
    waitForBefore?: number,
    waitForBetween?: number,
    waitForAfter?: number
  ): Promise<void>

}
