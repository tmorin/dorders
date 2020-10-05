import {Result} from '../../fwk/model/Result';

export class StopLocalPeerResult extends Result<void> {
  constructor() {
    super(undefined, StopLocalPeerResult.name);
  }
}
