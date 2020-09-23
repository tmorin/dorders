import {LocalPeerFactorySymbol} from '@dorders/model-peer';
import {SimpleLocalPeerFactory} from './SimpleLocalPeerFactory';
import {AbstractModule, LoggerFactory, LoggerFactorySymbol} from '@dorders/framework';

export class InfraPeerModule extends AbstractModule {

  async configure(): Promise<void> {

    // FACTORIES

    this.registry.registerFactory(
      LocalPeerFactorySymbol,
      registry => new SimpleLocalPeerFactory(
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ),
      {
        singleton: true
      }
    );

  }

}
