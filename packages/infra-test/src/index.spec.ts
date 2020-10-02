import {Event} from '@dorders/fwk-model-core';
import {FwkInfraTestContainers} from './FwkInfraTestContainers';
import {waitForMany, waitForOnce} from '@dorders/fwk-model-test';

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

  it('should wait for an event', async function () {
    const containers = await FwkInfraTestContainers.create();
    const [container1] = await containers.startContainers(1);
    const pWaitForOnce = waitForOnce(container1, EventA.name);
    await container1.messageBus.publish(new EventA());
    await pWaitForOnce;
    await containers.disposeContainers();
  });

  it('should wait for many events', async function () {
    const containers = await FwkInfraTestContainers.create();
    const [container1] = await containers.startContainers(1);
    const pWaitForMany = waitForMany(container1, EventB.name, 3);
    await container1.messageBus.publish(new EventB());
    await container1.messageBus.publish(new EventB());
    await container1.messageBus.publish(new EventB());
    await pWaitForMany;
    await containers.disposeContainers();
  });

})
