import {Event} from '../../fwk/model/Event';

export class LocalPeerStopped extends Event<void> {
  constructor() {
    super(undefined, LocalPeerStopped.name);
  }
}
