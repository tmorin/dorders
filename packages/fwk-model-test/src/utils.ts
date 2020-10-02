import {Container, Event, EventListenerCallback, MessageName} from '@dorders/fwk-model-core';

export async function waitFor(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function waitForOnce(container: Container, ...names: Array<MessageName>): Promise<Array<Event>> {
  return Promise.all(names.map(name => new Promise<Event>(resolve => container.messageBus.once(name, resolve))));
}

export function waitForMany(context: Container, name: MessageName, occurrences: number): Promise<Array<Event>> {
  return new Promise<Array<Event>>(resolve => {
    const events: Array<Event> = [];
    const listener: EventListenerCallback = (event: Event) => {
      events.push(event);
      if (events.length === occurrences) {
        context.messageBus.off(name, listener);
        resolve(events)
      }
    }
    context.messageBus.on(name, listener);
  })
}
