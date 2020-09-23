import {Message, MessageName, MessageType} from './message';

export abstract class Event<B = any> implements Message<B> {

  protected constructor(
    readonly body: B,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.event
  ) {
  }

}

export interface EventListenerCallback<E extends Event = Event> {
  (event?: E): void
}

export type EventListenerOptions = {
  once: boolean
}
export type EventName = MessageName

export const EventListenerSymbol = Symbol.for('fwk/EventListener');

export abstract class EventListener {

  abstract listen<E extends Event>(event?: E, options?: EventListenerOptions): Promise<void>

}

export function listenEvents(...names: Array<EventName>) {
  return (constructor: Function) => {
    constructor['__fwkHandledEventNames'] = names;
  }
}
