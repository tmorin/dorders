import {startContainers, StartOptions} from '@dorders/infra-test';
import {ConsoleLogger, Level} from '@dorders/infra-logger-console';
import {ModelProfileModule} from '@dorders/model-profile';
import {InfraProfileModule} from '../';

ConsoleLogger.DEFAULT_LEVEL = Level.warn;

export async function startDemoContainers(
  numbers: number,
  options: Partial<StartOptions> = {}
) {
  return await startContainers(numbers, options, () => ([
    new ModelProfileModule(), new InfraProfileModule(),
  ]))
}
