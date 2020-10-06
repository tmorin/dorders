import {Message, MessageName, MessageType} from './message';

export abstract class Result<M = any> implements Message<M> {

  /* istanbul ignore next */
  protected constructor(
    readonly body: M,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.result
  ) {
  }

}

export class EmptyResult extends Result<void> {
  public static readonly RESULT_NAME = Symbol.for(`fwk/${EmptyResult.name}`);

  /* istanbul ignore next */
  constructor() {
    super(undefined, EmptyResult.name)
  }

  static create() {
    return new EmptyResult();
  }
}
