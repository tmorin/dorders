import {Event} from '@dorders/framework';
import {PeerId} from './PeerId';

export type PeerStoppedBody = {
  peerId: PeerId
}

/**
 * A peer has been stopped.
 */
export class LocalPeerStopped extends Event<PeerStoppedBody> {
  public static readonly EVENT_NAME = Symbol.for(`peer/${LocalPeerStopped.name}`);

  constructor(body: PeerStoppedBody) {
    super(body, LocalPeerStopped.EVENT_NAME);
  }

}
