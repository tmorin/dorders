export interface LoggerFactory {

  create(...names: Array<string>): Logger

}

export const LoggerFactorySymbol = Symbol.for('fwk/LoggerFactory');

export interface Logger {

  debug(message?: any, ...optionalParams: any[]): void

  log(message?: any, ...optionalParams: any[]): void

  info(message?: any, ...optionalParams: any[]): void

  warn(message?: any, ...optionalParams: any[]): void

  error(message?: any, ...optionalParams: any[]): void

}
