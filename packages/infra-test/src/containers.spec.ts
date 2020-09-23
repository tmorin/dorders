import {Containers} from './containers';
import {ConfigProviderSymbol, LoggerFactorySymbol, MessageBusSymbol} from '@dorders/framework';

describe('containers', function () {

  it('should start and dispose containers', async function () {
    const containers = new Containers();
    const [container0, container1] = await containers.startContainers(2, {
      clean: true,
      verbose: true
    });
    expect(container0).toBeTruthy();
    expect(container1).toBeTruthy();
    expect(containers.instances.length).toBe(2);
    await containers.disposeContainers();
    expect(containers.instances.length).toBe(0);
  });

  it('should have a configured container', async function () {
    const containers = new Containers();
    const [container0] = await containers.startContainers(1, {
      clean: false,
      verbose: false
    });
    expect(container0.registry.resolve(MessageBusSymbol)).toBeTruthy();
    expect(container0.registry.resolve(LoggerFactorySymbol)).toBeTruthy();
    expect(container0.registry.resolve(ConfigProviderSymbol)).toBeTruthy();
    await containers.disposeContainers();
  });

  it('should start simple container', async function () {
    const containers = new Containers([]);
    const container0 = await containers.startContainer(0);
    expect(container0.registry.resolve(MessageBusSymbol)).toBeTruthy();
    expect(container0.registry.resolve(LoggerFactorySymbol)).toBeTruthy();
    expect(container0.registry.resolve(ConfigProviderSymbol)).toBeTruthy();
    await containers.disposeContainers();
  });

  it('should dispose a container', async function () {
    const containers = new Containers([]);
    const [container1, container2, container3] = await containers.startContainers(3);
    expect(container1).toBeTruthy();
    expect(container2).toBeTruthy();
    expect(container3).toBeTruthy();
    expect(containers.instances.length).toBe(3);
    await containers.disposeContainer(1)
    expect(containers.instances.length).toBe(2);
    await containers.disposeContainers();
    expect(containers.instances.length).toBe(0);
  });

})
