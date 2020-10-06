import {Result} from '../../fwk/model/Result';
import {PeerId} from './PeerId';

export class StopLocalPeerResult extends Result<void> {
  constructor(
    public readonly peerId: PeerId
  ) {
    super(undefined, StopLocalPeerResult.name);
  }
}
