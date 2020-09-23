import {LocalPeerStopped} from './LocalPeerStopped';
import {Command, CommandHandler, handleCommands} from '@dorders/framework';
import {LocalPeerFactory} from './LocalPeerFactory';

/**
 * Stop the peer.
 */
export class StopLocalPeer extends Command {
  public static readonly COMMAND_NAME = Symbol.for(`peer/${StopLocalPeer.name}`);

  constructor() {
    super(undefined, StopLocalPeer.COMMAND_NAME);
  }
}

@handleCommands(StopLocalPeer.COMMAND_NAME)
export class StopLocalPeerHandler implements CommandHandler<StopLocalPeer> {

  constructor(
    private readonly localPeerFactory: LocalPeerFactory
  ) {
  }

  async handle(message: StopLocalPeer): Promise<[LocalPeerStopped]> {
    const localPeer = await this.localPeerFactory.create();
    const peerStopped = new LocalPeerStopped({
      peerId: localPeer.peerId
    });
    await localPeer.applyPeerStopped(peerStopped);
    return [peerStopped];
  }

}
