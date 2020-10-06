import {Result} from '../../fwk/model/Result';
import {PeerId} from './PeerId';

export class StartLocalPeerResult extends Result<void> {
  constructor(
    public readonly peerId: PeerId
  ) {
    super(undefined, StartLocalPeerResult.name);
  }
}
