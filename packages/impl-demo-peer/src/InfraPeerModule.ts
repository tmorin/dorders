import {LocalPeerFactorySymbol} from '@dorders/model-peer';
import {InMemoryLocalPeerFactory} from './InMemoryLocalPeerFactory';
import {AbstractModule, LoggerFactory, LoggerFactorySymbol} from '@dorders/framework';

export class InfraPeerModule extends AbstractModule {

  async configure(): Promise<void> {

    // FACTORIES

    this.registry.registerFactory(
      LocalPeerFactorySymbol,
      registry => new InMemoryLocalPeerFactory(
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ),
      {
        singleton: true
      }
    );

  }

}
