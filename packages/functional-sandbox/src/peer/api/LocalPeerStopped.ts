import {Event} from '../../fwk/model/Event';
import {PeerId} from './PeerId';

export class LocalPeerStopped extends Event<void> {
  constructor(
    public readonly peerId: PeerId
  ) {
    super(undefined, LocalPeerStopped.name);
  }
}
