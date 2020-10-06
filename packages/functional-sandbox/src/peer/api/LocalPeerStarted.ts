import {Event} from '../../fwk/model/Event';
import {PeerId} from './PeerId';

export class LocalPeerStarted extends Event<void> {
  constructor(
    public readonly peerId: PeerId
  ) {
    super(undefined, LocalPeerStarted.name);
  }
}
