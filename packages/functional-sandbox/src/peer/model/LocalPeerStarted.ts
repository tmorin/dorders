import {Event} from '../../fwk/model/Event';

export class LocalPeerStarted extends Event<void> {
  constructor() {
    super(undefined, LocalPeerStarted.name);
  }
}
