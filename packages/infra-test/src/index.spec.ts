import {disposeContainers, startContainers, waitFor, waitForMany, waitForOnce} from '.';
import {ConfigProviderSymbol, Event, LoggerFactorySymbol, MessageBusSymbol} from '@dorders/framework';

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

  it('should have a configured container', async function () {
    const [container1] = await startContainers(1, {verbose: true});
    expect(container1.registry.resolve(MessageBusSymbol)).toBeTruthy();
    expect(container1.registry.resolve(LoggerFactorySymbol)).toBeTruthy();
    expect(container1.registry.resolve(ConfigProviderSymbol)).toBeTruthy();
    await disposeContainers();
  });

  it('should start and dispose contexts', async function () {
    const [container1, container2] = await startContainers(2);
    expect(container1).toBeTruthy();
    expect(container2).toBeTruthy();
    await disposeContainers();
  });

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
