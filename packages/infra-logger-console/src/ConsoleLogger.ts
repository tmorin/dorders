import {Logger} from '@dorders/framework';

export enum Level {
  debug,
  log,
  info,
  warn,
  error,
}

export class ConsoleLogger implements Logger {

  public static DEFAULT_LEVEL: Level = Level.debug

  constructor(
    public readonly prefix: string
  ) {
  }

  debug(message?: any, ...optionalParams: any[]): void {
    if (ConsoleLogger.DEFAULT_LEVEL <= Level.debug) {
      console.debug.apply(console, [`${this.prefix} - ${message}`, ...optionalParams]);
    }
  }

  log(message?: any, ...optionalParams: any[]): void {
    if (ConsoleLogger.DEFAULT_LEVEL <= Level.log) {
      console.log.apply(console, [`${this.prefix} - ${message}`, ...optionalParams]);
    }
  }

  info(message?: any, ...optionalParams: any[]): void {
    if (ConsoleLogger.DEFAULT_LEVEL <= Level.info) {
      console.info.apply(console, [`${this.prefix} - ${message}`, ...optionalParams]);
    }
  }

  warn(message?: any, ...optionalParams: any[]): void {
    if (ConsoleLogger.DEFAULT_LEVEL <= Level.warn) {
      console.warn.apply(console, [`${this.prefix} - ${message}`, ...optionalParams]);
    }
  }

  error(message?: any, ...optionalParams: any[]): void {
    if (ConsoleLogger.DEFAULT_LEVEL <= Level.error) {
      console.error.apply(console, [`${this.prefix} - ${message}`, ...optionalParams]);
    }
  }

}
