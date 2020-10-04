import {Message, MessageName, MessageType} from './Message';

export abstract class Result<M = any> implements Message<M> {

  /* istanbul ignore next */
  protected constructor(
    readonly body: M,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.result
  ) {
  }

}
