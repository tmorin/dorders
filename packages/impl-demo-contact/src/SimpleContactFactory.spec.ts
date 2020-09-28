import {Container} from '@dorders/framework';
import {DemoContainers} from './__helpers__/containers';
import {ContactFactory, ContactFactorySymbol} from '@dorders/model-contact';
import {createPrivateProfile} from './__helpers__/utilities';

describe('SimpleContactFactory', function () {

  let containers: DemoContainers;
  let container0: Container;
  let container1: Container;
  beforeEach(async function () {
    containers = new DemoContainers();
    [container0, container1] = await containers.startContainers(2);
  });
  afterEach(async function () {
    await containers.disposeContainers();
  });

  it('should create contact', async function () {
    const profileA = await createPrivateProfile(container0, 'profileA');
    const profileB = await createPrivateProfile(container1, 'profileB');
    const profileBPubRef = await profileB.publicProfile.getReference();
    const contactFactory0 = container0.registry.resolve<ContactFactory>(ContactFactorySymbol);
    const contactB = await contactFactory0.createFromReference(profileA.profileId, profileBPubRef);
    expect(contactB).toBeTruthy();
    expect(contactB.contactId).toBe(profileB.profileId);
    expect(contactB.profileId).toBe(profileA.profileId);
    expect(contactB.name).toBe('profileB');
    expect(contactB.publicProfile.card).toBe('profileB');
  })

})
