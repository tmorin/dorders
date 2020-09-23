import {startContainers, StartOptions} from '@dorders/infra-test';
import {ModelPeerModule} from '@dorders/model-peer';
import {ConsoleLogger, Level} from '@dorders/infra-logger-console';
import {InfraPeerModule} from '../';

ConsoleLogger.DEFAULT_LEVEL = Level.warn;

export async function startDemoContainers(
  numbers: number,
  options: Partial<StartOptions> = {}
) {
  return await startContainers(numbers, options, () => ([
    new ModelPeerModule(), new InfraPeerModule(),
  ]))
}
