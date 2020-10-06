import {Message, MessageName, MessageType} from './message';
import {Event} from './event';
import {Result} from './result';

export abstract class Command<B = any> implements Message<B> {

  /* istanbul ignore next */
  protected constructor(
    readonly body: B,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.command
  ) {
  }

}

export type CommandName = MessageName;

export const CommandHandlerSymbol = Symbol.for('fwk/CommandHandler');

export abstract class CommandHandler<C extends Command = Command, R extends Result = Result, E extends Event = Event> {

  abstract handle(command: C): Promise<[R, Array<E>]>

}

export function handleCommands(...names: Array<CommandName>) {
  return (constructor: Function) => {
    constructor.prototype['__fwkHandledCommandNames'] = names;
  }
}
