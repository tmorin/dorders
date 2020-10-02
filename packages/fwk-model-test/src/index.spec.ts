import {Event} from '@dorders/fwk-model-core';
import {waitFor} from '.';

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

})
