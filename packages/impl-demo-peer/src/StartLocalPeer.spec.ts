import {Container} from '@dorders/framework';
import {disposeContainers, waitForOnce} from '@dorders/infra-test';
import {LocalPeerStarted, StartLocalPeer} from '@dorders/model-peer';
import {startDemoContainers} from './__helpers__/container';

describe('StartLocalPeer', function () {

  let container0: Container;
  beforeEach(async function () {
    [container0] = await startDemoContainers(1);
  });
  afterEach(async function () {
    await disposeContainers();
  });

  it('should succeed', async function () {
    const command = new StartLocalPeer();
    const pLocalPeerStarted = waitForOnce(container0, LocalPeerStarted.EVENT_NAME);
    const [localPeerStarted] = await container0.messageBus.execute<LocalPeerStarted>(command);
    expect(localPeerStarted).toBeTruthy();
    expect(localPeerStarted.body.peerId).toBeTruthy();
    await pLocalPeerStarted;
  });

});
