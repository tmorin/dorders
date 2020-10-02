import {Event} from '@dorders/fwk-model-core';
import {PeerId} from './PeerId';

export type PeerStartedBody = {
  peerId: PeerId
}

/**
 * A peer has been started.
 */
export class LocalPeerStarted extends Event<PeerStartedBody> {
  public static readonly EVENT_NAME = Symbol.for(`peer/${LocalPeerStarted.name}`);

  constructor(body: PeerStartedBody) {
    super(body, LocalPeerStarted.EVENT_NAME);
  }

}
