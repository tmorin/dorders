import {AbstractModule, CommandHandlerSymbol} from '@tmorin/ddd-fwk-model-core';
import {StartLocalPeerHandler} from './StartLocalPeer';
import {LocalPeerFactory, LocalPeerFactorySymbol} from './LocalPeerFactory';
import {StopLocalPeerHandler} from './StopLocalPeer';

export class ModelPeerModule extends AbstractModule {

  async configure(): Promise<void> {

    // COMMANDS

    this.registry.registerFactory(
      CommandHandlerSymbol,
      registry => new StartLocalPeerHandler(
        registry.resolve<LocalPeerFactory>(LocalPeerFactorySymbol)
      ),
      {
        singleton: true
      }
    );

    this.registry.registerFactory(
      CommandHandlerSymbol,
      registry => new StopLocalPeerHandler(
        registry.resolve<LocalPeerFactory>(LocalPeerFactorySymbol)
      ), {
        singleton: true
      }
    );

  }

}
