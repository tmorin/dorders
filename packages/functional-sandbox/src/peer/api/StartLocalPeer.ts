import {Command} from '../../fwk/model/Command';

export class StartLocalPeer extends Command<void> {
  constructor() {
    super(undefined, StartLocalPeer.name);
  }
}
