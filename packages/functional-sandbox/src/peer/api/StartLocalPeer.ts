import {Command} from '../../fwk/model/Command';
import {PeerId} from './PeerId';
import {Result} from '../../fwk/model/Result';

export type StartLocalPeerResult = Result<{
  peerId: PeerId
}>

export class StartLocalPeer extends Command<void> {
  constructor(
    public readonly peerId: PeerId = 'local'
  ) {
    super(undefined, StartLocalPeer.name);
  }
}
