import {Containers, waitForOnce} from '@dorders/fwk-model-test';
import {AbstractContactValidator} from './AbstractContactValidator';
import {ContactRenamed, RenameContact} from '@dorders/contact-model';

export class RenameContactValidator extends AbstractContactValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1] = await this.containers.startContainers(3);

    const profileAId = await this.createProfile(container0, 'ProfileA')
    const [contactId1] = await this.addContacts(container0, container1, profileAId, 1);

    let pWaitForEvents = waitForOnce(container0, ContactRenamed.EVENT_NAME);
    await container0.messageBus.execute(new RenameContact({
      profileId: profileAId,
      contactId: contactId1,
      newName: 'new name'
    }));
    await pWaitForEvents;
  }

}
