import {Containers, waitForMany, waitForOnce} from '@tmorin/ddd-fwk-model-test';
import {AbstractContactValidator} from './AbstractContactValidator';
import {
  ContactCreated,
  ContactsLoaded,
  ContactsSynchronized,
  ContactSynchronized,
  RenameContact
} from '@dorders/contact-model';
import {ProfileSynchronized, UpdateProfileCard} from '@dorders/profile-model';

export class ContactSynchronizerValidator extends AbstractContactValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1, container2] = await this.containers.startContainers(3);

    console.log('----- create profiles')
    const profileAId = await this.createProfile(container0, 'ProfileA');
    const profileBId = await this.createProfile(container1, 'ProfileB');

    console.log('----- add contact')
    const contactBId = await this.addContact(container0, profileAId, container1, profileBId);

    console.log('----- import profile')
    let pWaitForEvents2 = waitForOnce(container2, ContactsLoaded.EVENT_NAME, ContactsSynchronized.EVENT_NAME);
    let pWaitForContactCreated = waitForMany(container2, ContactCreated.EVENT_NAME, 1);
    await this.importProfile(container0, container2, profileAId);
    await pWaitForEvents2;
    await pWaitForContactCreated;

    console.log('----- rename contact')
    pWaitForEvents2 = waitForOnce(container2, ProfileSynchronized.EVENT_NAME, ContactsSynchronized.EVENT_NAME);
    await container0.messageBus.execute(new RenameContact({
      profileId: profileAId,
      contactId: contactBId,
      newName: 'new name'
    }));
    await pWaitForEvents2;

    console.log('----- change contact card')
    let pWaitForEvents0 = waitForOnce(container0, ContactSynchronized.EVENT_NAME);
    pWaitForEvents2 = waitForOnce(container2, ContactSynchronized.EVENT_NAME);
    await container1.messageBus.execute(new UpdateProfileCard({
      profileId: profileBId,
      profileCard: 'new name'
    }));
    await pWaitForEvents0;
    await pWaitForEvents2;
  }

}
