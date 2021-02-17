import {Containers, waitForMany, waitForOnce} from '@tmorin/ddd-fwk-model-test';
import {AbstractContactValidator} from './AbstractContactValidator';
import {ContactCreated, ContactDeleted, ContactsLoaded, ContactsSynchronized} from '@dorders/contact-model';

export class ContactsSynchronizerValidator extends AbstractContactValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1, container2] = await this.containers.startContainers(3);

    console.log('---- createProfile')
    const profileAId = await this.createProfile(container0, 'ProfileA')
    await this.addContacts(container0, container1, profileAId, 3);

    console.log('---- importProfile')
    let pWaitForEvents = waitForOnce(container2, ContactsLoaded.EVENT_NAME, ContactsSynchronized.EVENT_NAME);
    await this.importProfile(container0, container2, profileAId);
    await pWaitForEvents;

    console.log('---- addContacts')
    pWaitForEvents = waitForOnce(container2, ContactsSynchronized.EVENT_NAME);
    let pWaitForContactCreated = waitForMany(container2, ContactCreated.EVENT_NAME, 1);
    const [addedContactId] = await this.addContacts(container0, container1, profileAId, 1);
    await pWaitForEvents;
    await pWaitForContactCreated;

    console.log('---- removeContact')
    pWaitForEvents = waitForOnce(container2, ContactsSynchronized.EVENT_NAME);
    let pWaitForContactDeleted = waitForMany(container2, ContactDeleted.EVENT_NAME, 1);
    await this.removeContact(container0, container1, profileAId, addedContactId);
    await pWaitForEvents;
    await pWaitForContactDeleted;
  }

}
