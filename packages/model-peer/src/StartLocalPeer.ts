import {LocalPeerStarted} from './LocalPeerStarted';
import {Command, CommandHandler, handleCommands} from '@dorders/fwk-model-core';
import {LocalPeerFactory} from './LocalPeerFactory';

/**
 * Start the peer.
 */
export class StartLocalPeer extends Command {
  public static readonly COMMAND_NAME = Symbol.for(`peer/${StartLocalPeer.name}`);

  constructor() {
    super(undefined, StartLocalPeer.COMMAND_NAME);
  }
}

@handleCommands(StartLocalPeer.COMMAND_NAME)
export class StartLocalPeerHandler implements CommandHandler<StartLocalPeer> {

  constructor(
    private readonly localPeerFactory: LocalPeerFactory
  ) {
  }

  async handle(message: StartLocalPeer): Promise<[LocalPeerStarted]> {
    const localPeer = await this.localPeerFactory.create();
    const peerStarted = new LocalPeerStarted({
      peerId: localPeer.peerId
    });
    await localPeer.applyPeerStarted(peerStarted);
    return [peerStarted];
  }

}
