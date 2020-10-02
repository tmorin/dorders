import {Event, EventListener, EventListenerOptions, listenEvents} from './event';

class EventA extends Event {
  constructor() {
    super(undefined, EventA.name);
  }
}

@listenEvents(EventA.name)
class EventAListener implements EventListener {
  async listen<EventA>(event?: EventA, options?: EventListenerOptions): Promise<void> {
  }
}

describe('event', function () {

  it('should flags handler with @listenEvents', function () {
    expect(EventAListener['prototype']['__fwkHandledEventNames']).toContainEqual(EventA.name);
    const queryAHandler = new EventAListener();
    expect(queryAHandler['__fwkHandledEventNames']).toContainEqual(EventA.name);
  });

})
