import {LocalPeerStopped, StopLocalPeer} from '@dorders/peer-model';
import {AbstractContainedValidator, Containers, waitForOnce} from '@dorders/fwk-model-test';

export class StopLocalPeerValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }


  async test(): Promise<void> {
    const [container0] = await this.containers.startContainers(1);
    const command = new StopLocalPeer();
    const pLocalPeerStopped = waitForOnce(container0, LocalPeerStopped.EVENT_NAME);
    const [, [localPeerStopped]] = await container0.messageBus.execute<LocalPeerStopped>(command);
    expect(localPeerStopped).toBeTruthy();
    expect(localPeerStopped.body.peerId).toBeTruthy();
    await pLocalPeerStopped;
  }

}
