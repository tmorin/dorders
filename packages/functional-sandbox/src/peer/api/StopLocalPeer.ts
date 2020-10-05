import {Command} from '../../fwk/model/Command';

export class StopLocalPeer extends Command<void> {
  constructor() {
    super(undefined, StopLocalPeer.name);
  }
}
