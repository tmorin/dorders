import {Message, MessageName, MessageType} from './message';
import {Event} from './event';

export abstract class Command<B = any> implements Message<B> {

  protected constructor(
    readonly body: B,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.command
  ) {
  }

}

export type CommandName = MessageName;

export const CommandHandlerSymbol = Symbol.for('fwk/CommandHandler');

export abstract class CommandHandler<C extends Command = Command, E extends Event = Event> {

  abstract handle(command: C): Promise<Array<E>>

}

export function handleCommands(...names: Array<CommandName>) {
  return (constructor: Function) => {
    constructor.prototype['__fwkHandledCommandNames'] = names;
  }
}
