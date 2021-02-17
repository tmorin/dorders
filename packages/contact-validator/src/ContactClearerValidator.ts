import {Containers, waitForMany, waitForOnce} from '@tmorin/ddd-fwk-model-test';
import {DeleteProfile, ProfileDeleted} from '@dorders/profile-model';
import {AbstractContactValidator} from './AbstractContactValidator';
import {ContactDeleted, ContactsCleared} from '@dorders/contact-model';

export class ContactClearerValidator extends AbstractContactValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1] = await this.containers.startContainers(2);

    const profileAId = await this.createProfile(container0, 'ProfileA')

    await this.addContacts(container0, container1, profileAId, 3);

    let pWaitForContactsCleared = waitForOnce(container0, ContactsCleared.EVENT_NAME);
    let pWaitForContactDeleted = waitForMany(container0, ContactDeleted.EVENT_NAME, 3);
    await container0.messageBus.execute<ProfileDeleted>(new DeleteProfile({profileId: profileAId}));
    await pWaitForContactsCleared;
    await pWaitForContactDeleted;
  }

}
