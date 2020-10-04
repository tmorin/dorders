import {Message, MessageName, MessageType} from './Message';

export abstract class Event<B = any> implements Message<B> {

  /* istanbul ignore next */
  protected constructor(
    readonly body: B,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.event
  ) {
  }

}
