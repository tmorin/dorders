import {Container} from '@dorders/framework';
import {disposeContainers, waitForOnce} from '@dorders/infra-test';
import {LocalPeerStopped, StopLocalPeer} from '@dorders/model-peer';
import {startDemoContainers} from './__helpers__/container';

describe('StopLocalPeer', function () {

  let container0: Container;
  beforeEach(async function () {
    [container0] = await startDemoContainers(1);
  });
  afterEach(async function () {
    await disposeContainers();
  });

  it('should succeed', async function () {
    const command = new StopLocalPeer();
    const pLocalPeerStopped = waitForOnce(container0, LocalPeerStopped.EVENT_NAME);
    const [localPeerStopped] = await container0.messageBus.execute<LocalPeerStopped>(command);
    expect(localPeerStopped).toBeTruthy();
    expect(localPeerStopped.body.peerId).toBeTruthy();
    await pLocalPeerStopped;
  });

});
