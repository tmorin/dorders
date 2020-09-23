import {Container, ContainerBuilder} from './container';
import {OnlyConfigureModule} from './module';

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

});
