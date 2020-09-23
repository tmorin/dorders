import {disposeContainers, startContainers, waitFor, waitForMany, waitForOnce} from '.';
import {Event} from '@dorders/framework';

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

describe('infra-test', function () {

  it('should wait for 200 ms', async function () {
    await waitFor(200);
  });

  it('should wait for an event', async function () {
    const [container1] = await startContainers(2);
    const pWaitForOnce = waitForOnce(container1, EventA.name);
    await container1.messageBus.publish(new EventA());
    await pWaitForOnce;
    await disposeContainers();
  });

  it('should wait for many events', async function () {
    const [container1] = await startContainers(2);
    const pWaitForMany = waitForMany(container1, EventB.name, 3);
    await container1.messageBus.publish(new EventB());
    await container1.messageBus.publish(new EventB());
    await container1.messageBus.publish(new EventB());
    await pWaitForMany;
    await disposeContainers();
  });

})
