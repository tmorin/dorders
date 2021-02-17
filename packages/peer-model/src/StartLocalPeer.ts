import {LocalPeerStarted} from './LocalPeerStarted';
import {Command, CommandHandler, EmptyResult, handleCommands} from '@tmorin/ddd-fwk-model-core';
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
export class StartLocalPeerHandler implements CommandHandler<StartLocalPeer, EmptyResult> {

  constructor(
    private readonly localPeerFactory: LocalPeerFactory
  ) {
  }

  async handle(command: StartLocalPeer): Promise<[EmptyResult, [LocalPeerStarted]]> {
    const localPeer = await this.localPeerFactory.create();
    const peerStarted = new LocalPeerStarted({
      peerId: localPeer.peerId
    });
    await localPeer.applyPeerStarted(peerStarted);
    return [EmptyResult.from(command), [peerStarted]];
  }

}
