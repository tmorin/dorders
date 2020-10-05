import {Result} from '../../fwk/model/Result';

export class StartLocalPeerResult extends Result<void> {
  constructor() {
    super(undefined, StartLocalPeerResult.name);
  }
}
