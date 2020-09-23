import {ConfigProviderSymbol, LoggerFactorySymbol, MessageBusSymbol} from '@dorders/framework';
import {disposeContainer, disposeContainers, getRunningContainers, startContainers} from './container';

describe('container', function () {

  it('should have a configured container', async function () {
    const [container1] = await startContainers(1, {verbose: true});
    expect(container1.registry.resolve(MessageBusSymbol)).toBeTruthy();
    expect(container1.registry.resolve(LoggerFactorySymbol)).toBeTruthy();
    expect(container1.registry.resolve(ConfigProviderSymbol)).toBeTruthy();
    await disposeContainers();
  });

  it('should dispose a container', async function () {
    const [container1, container2, container3] = await startContainers(3);
    expect(container1).toBeTruthy();
    expect(container2).toBeTruthy();
    expect(container3).toBeTruthy();
    expect(getRunningContainers().length).toBe(3);
    await disposeContainer(1)
    expect(getRunningContainers().length).toBe(2);
    await disposeContainers();
    expect(getRunningContainers().length).toBe(0);
  });

})
