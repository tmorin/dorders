/**
 * The name of a message.
 */
export type MessageName = string | symbol;

/**
 * The messages types.
 */
export enum MessageType {
  /**
   * A command is a wish to do something.
   */
  command = 'command',
  /**
   * A query is a wish to retrieve the state of the system or a part of it.
   */
  query = 'query',
  /**
   * An event is something which had an impact and/or will have an impact in the future.
   */
  event = 'event',
  /**
   * A result is the output of a something, it usually dedicated to the sender.
   */
  result = 'result'
}

/**
 * A message is an information published by a
 */
export interface Message<B = any> {
  /**
   * The name of the message.
   */
  readonly name: MessageName
  /**
   * The type of the message.
   */
  readonly type: MessageType
  /**
   * The body of the message.
   */
  readonly body: B
}
