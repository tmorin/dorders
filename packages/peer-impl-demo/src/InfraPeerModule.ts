import {LocalPeerFactorySymbol} from '@dorders/peer-model';
import {SimpleLocalPeerFactory} from './SimpleLocalPeerFactory';
import {AbstractModule, LoggerFactory, LoggerFactorySymbol} from '@tmorin/ddd-fwk-model-core';

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
