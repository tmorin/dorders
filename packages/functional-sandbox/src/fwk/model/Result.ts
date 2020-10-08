import {Message, MessageName, MessageType} from './Message';

export class Result<B = any> implements Message<B> {

  constructor(
    readonly body: B,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.result
  ) {
  }

}
