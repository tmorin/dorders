import {StartLocalPeerValidator, StopLocalPeerValidator} from '@dorders/peer-validator';
import {DemoContainers} from './__helpers__/container';

describe('validators', function () {

  it('should pass StartLocalPeerValidator', async function () {
    await new StartLocalPeerValidator(await DemoContainers.create()).test();
  });

  it('should pass StopLocalPeerValidator', async function () {
    await new StopLocalPeerValidator(await DemoContainers.create()).test();
  });

})
