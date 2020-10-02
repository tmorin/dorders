import {Container, Event, EventListenerCallback, EventName, MessageBusSymbol} from '@dorders/fwk-model-core';
import {waitFor, waitForMany, waitForOnce} from '.';

class EventA extends Event {
  constructor() {
    super(undefined, EventA.name);
  }
}

class EventB extends Event {
  constructor() {
    super(undefined, EventB.name);
  }
}

describe('fwk-model-test', function () {

  it('should wait for 200 ms', async function () {
    await waitFor(200);
  });

  it('should wait for many event occurrences', async function () {
    const container = new Container();
    const busMock = {
      on(name: EventName, listener: EventListenerCallback) {
        setTimeout(() => listener(new EventA()), 0);
        setTimeout(() => listener(new EventA()), 0);
        setTimeout(() => listener(new EventA()), 0);
      },
      off() {
      }
    };
    container.registry.registerValue(MessageBusSymbol, busMock);
    const events = await waitForMany(container, EventA.name, 3);
    expect(events.length).toBe(3);
  });

  it('should wait for once events', async function () {
    const container = new Container();
    const busMock = {
      once(name: EventName, listener: EventListenerCallback) {
        if (name === EventA.name) {
          setTimeout(() => listener(new EventA()), 0);
        } else if (name === EventB.name) {
          setTimeout(() => listener(new EventA()), 0);
        }
      },
      off() {
      }
    };
    container.registry.registerValue(MessageBusSymbol, busMock);
    const events = await waitForOnce(container, EventA.name, EventB.name);
    expect(events.length).toBe(2);
  });

})
