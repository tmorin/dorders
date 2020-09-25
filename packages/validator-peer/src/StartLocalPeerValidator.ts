import {LocalPeerStarted, StartLocalPeer} from '@dorders/model-peer';
import {AbstractContainedValidator, Containers, waitForOnce} from '@dorders/infra-test';

export class StartLocalPeerValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }


  async test(): Promise<void> {
    const [container0] = this.containers.instances;
    const command = new StartLocalPeer();
    const pLocalPeerStarted = waitForOnce(container0, LocalPeerStarted.EVENT_NAME);
    const [localPeerStarted] = await container0.messageBus.execute<LocalPeerStarted>(command);
    expect(localPeerStarted).toBeTruthy();
    expect(localPeerStarted.body.peerId).toBeTruthy();
    await pLocalPeerStarted;
  }

}
