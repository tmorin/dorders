import {Command} from '../../fwk/model/Command';
import {PeerId} from './PeerId';

export class StartLocalPeer extends Command<void> {
  constructor(
    public readonly peerId: PeerId = 'local'
  ) {
    super(undefined, StartLocalPeer.name);
  }
}
