import {Containers, waitForMany, waitForOnce} from '@dorders/infra-test';
import {AbstractContactValidator} from './AbstractContactValidator';
import {ContactCreated, ContactsLoaded, ContactsSynchronized} from '@dorders/model-contact';

export class ContactsLoaderValidator extends AbstractContactValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1, container2] = await this.containers.startContainers(3);

    const profileAId = await this.createProfile(container0, 'ProfileA')
    await this.addContacts(container0, container1, profileAId, 3);

    const pWaitForAllContactCreated = waitForMany(container2, ContactCreated.EVENT_NAME, 3);
    const pWaitForEvents = waitForOnce(container2, ContactsLoaded.EVENT_NAME, ContactsSynchronized.EVENT_NAME);

    await this.importProfile(container0, container2, profileAId);

    await pWaitForEvents;
    await pWaitForAllContactCreated;
  }

}
