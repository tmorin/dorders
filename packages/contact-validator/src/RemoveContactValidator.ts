import {Containers, waitForMany} from '@dorders/fwk-model-test';
import {AbstractContactValidator} from './AbstractContactValidator';
import {ContactDeleted} from '@dorders/contact-model';

export class RemoveContactValidator extends AbstractContactValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1] = await this.containers.startContainers(2);

    console.log('---- createProfile')
    const profileAId = await this.createProfile(container0, 'ProfileA')
    const [addedContactId] = await this.addContacts(container0, container1, profileAId, 3);

    console.log('---- removeContact')
    let pWaitForContactDeleted = waitForMany(container0, ContactDeleted.EVENT_NAME, 1);
    await this.removeContact(container0, container1, profileAId, addedContactId);
    await pWaitForContactDeleted;
  }

}
