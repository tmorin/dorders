import {Container, ContainerBuilder} from './container';
import {OnlyConfigureModule} from './module';
import {DefaultRegistry} from './registry';
import {CommandHandlerSymbol} from './command';
import {QueryHandlerSymbol} from './query';
import {EventListenerSymbol} from './event';
import {ComponentSymbol} from './component';

describe('container', () => {

  it('should failed when MessageBus missing', async function () {
    await expect(ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        // @ts-ignore
        this.setLoggerFactory({}).setConfigProvider({})
      }))
      .build()
      .initialize()).rejects.toThrow();
  });

  it('should failed when LoggerFactory missing', async function () {
    await expect(ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        // @ts-ignore
        this.setMessageBus({}).setConfigProvider({})
      }))
      .build()
      .initialize()).rejects.toThrow();
  });

  it('should failed when ConfigProvider missing', async function () {
    await expect(ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        // @ts-ignore
        this.setMessageBus({}).setLoggerFactory({})
      }))
      .build()
      .initialize()).rejects.toThrow();
  });

  it('should configure', async function () {
    await expect(ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        // @ts-ignore
        this.setMessageBus({}).setLoggerFactory({}).setConfigProvider({})
      }))
      .build()
      .initialize()).resolves.toBeInstanceOf(Container);
  });

  it('should have a name', async function () {
    const container = await ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        // @ts-ignore
        this.setMessageBus({}).setLoggerFactory({}).setConfigProvider({})
      }))
      .name('a container')
      .build()
      .initialize();
    expect(container.name).toBe('a container');
  });

  it('should have a custom registry', async function () {
    const registry = new DefaultRegistry();
    const container = await ContainerBuilder.create()
      .modules([OnlyConfigureModule.create(async function () {
        // @ts-ignore
        this.setMessageBus({}).setLoggerFactory({}).setConfigProvider({})
      })])
      .registry(registry)
      .build()
      .initialize();
    expect(container.registry).toBe(container.registry);
  });

  it('should register command handler', async function () {
    const cmd = {
      __fwkHandledCommandNames: ['cmdA']
    }
    const mocks = {
      registerCommandHandler() {
      }
    };
    const spyRegisterCommandHandler = jest.spyOn(mocks, 'registerCommandHandler');
    const container = await ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        this.registry.registerValue(CommandHandlerSymbol, {});
        this.registry.registerValue(CommandHandlerSymbol, cmd);
        // @ts-ignore
        this.setMessageBus(mocks).setLoggerFactory(mocks).setConfigProvider(mocks)
      }))
      .build()
      .initialize();
    expect(container.registry).toBe(container.registry);
    expect(spyRegisterCommandHandler).toHaveBeenCalled();
    expect(spyRegisterCommandHandler).toHaveBeenCalledWith('cmdA', cmd)
  });

  it('should register query handler', async function () {
    const qry = {
      __fwkHandledQueryNames: ['qryA']
    }
    const mocks = {
      registerQueryHandler() {
      }
    };
    const spyRegisterQueryHandler = jest.spyOn(mocks, 'registerQueryHandler');
    const container = await ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        this.registry.registerValue(QueryHandlerSymbol, {});
        this.registry.registerValue(QueryHandlerSymbol, qry);
        // @ts-ignore
        this.setMessageBus(mocks).setLoggerFactory(mocks).setConfigProvider(mocks)
      }))
      .build()
      .initialize();
    expect(container.registry).toBe(container.registry);
    expect(spyRegisterQueryHandler).toHaveBeenCalled();
    expect(spyRegisterQueryHandler).toHaveBeenCalledWith('qryA', qry)
  });

  it('should register event listener', async function () {
    const evt = {
      listen() {
      },
      __fwkHandledEventNames: ['evtA']
    }
    const mocks = {
      on() {
      }
    };
    const spyOn = jest.spyOn(mocks, 'on');
    const container = await ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        this.registry.registerValue(EventListenerSymbol, {});
        this.registry.registerValue(EventListenerSymbol, evt);
        // @ts-ignore
        this.setMessageBus(mocks).setLoggerFactory(mocks).setConfigProvider(mocks)
      }))
      .build()
      .initialize();
    expect(container.registry).toBe(container.registry);
    expect(spyOn).toHaveBeenCalled();
  });

  it('should register component listener and dispose them', async function () {
    const mocks = {
      configure() {
      },
      dispose() {
      }
    }
    const spyConfigure = jest.spyOn(mocks, 'configure');
    const spyDispose = jest.spyOn(mocks, 'dispose');
    const container = await ContainerBuilder.create()
      .module(OnlyConfigureModule.create(async function () {
        this.registry.registerValue(ComponentSymbol, mocks);
        // @ts-ignore
        this.setMessageBus(mocks).setLoggerFactory(mocks).setConfigProvider(mocks)
      }))
      .build()
      .initialize();
    expect(container.registry).toBe(container.registry);
    expect(spyConfigure).toHaveBeenCalled();
    await container.dispose();
    expect(spyDispose).toHaveBeenCalled();
  });

});
