import {Command} from '../../fwk/model/Command';
import {PeerId} from './PeerId';
import {Result} from '../../fwk/model/Result';

export type StopLocalPeerResult = Result<{
  peerId: PeerId
}>

export class StopLocalPeer extends Command<void> {
  constructor(
    public readonly peerId: PeerId = 'local'
  ) {
    super(undefined, StopLocalPeer.name);
  }
}
