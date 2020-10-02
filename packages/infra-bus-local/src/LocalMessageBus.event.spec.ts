import {Container, Event} from '@dorders/fwk-model-core';
import {LocalMessageBus} from '.';
import {ConsoleLoggerFactory} from '@dorders/infra-logger-console';

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

class EventC extends Event {
  constructor() {
    super(undefined, EventC.name);
  }
}

describe('LocalMessageBus/event', function () {

  it('should react on events', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));
    const waitForTwoEventA = new Promise(resolve => {
      let cnt = 0;
      bus.on('EventA', () => {
        cnt += 1;
        if (cnt === 2) {
          resolve();
        }
      })
    });
    await bus.publish(new EventA());
    await bus.publish(new EventB());
    await bus.publish(new EventA());
    await waitForTwoEventA;
  });

  it('should react once on event', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));
    let cnt = 0;
    bus.once('EventA', () => cnt += 1);
    const waitForEventB = new Promise(resolve => bus.once('EventB', resolve));
    await bus.publish(new EventA());
    await bus.publish(new EventA());
    await bus.publish(new EventB());
    await waitForEventB;
    expect(cnt).toEqual(1);
  });

  it('should remove listeners', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));

    const waitForEventA = new Promise(resolve => bus.on('EventA', resolve));

    let cntEventB = 0;
    const eventBListener = () => cntEventB++;
    bus.on(EventB.name, eventBListener)

    let cntEventC = 0;
    const eventCListener = () => cntEventC++;
    bus.on(EventC.name, eventCListener)

    await bus.publish(new EventB());
    await bus.publish(new EventC());
    bus.off(EventB.name).off(EventC.name, eventCListener)
    await bus.publish(new EventB());
    await bus.publish(new EventC());

    await bus.publish(new EventA());

    await waitForEventA;

    expect(cntEventB).toBe(1);
    expect(cntEventC).toBe(1);
  });

});

