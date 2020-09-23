import {Logger, LoggerFactory} from '@dorders/framework';
import {ConsoleLogger} from './ConsoleLogger';

export class ConsoleLoggerFactory implements LoggerFactory {

  create(...names: Array<string>): Logger {
    return new ConsoleLogger(names.join('/'));
  }

}
