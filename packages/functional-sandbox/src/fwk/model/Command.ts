import {Message, MessageName, MessageType} from './Message';
import {Result} from './Result';

export abstract class Command<B = any> implements Message<B> {

  /* istanbul ignore next */
  protected constructor(
    readonly body: B,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.command
  ) {
  }

  toResult<B = any>(body?: B): Result<B> {
    return new Result<B>(body, this.name);
  }

}
