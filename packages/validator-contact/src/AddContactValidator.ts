import {CreateProfile, ProfileCreated} from '@dorders/model-profile';
import {AbstractContactValidator, getSerializedPublicReference} from './AbstractContactValidator';
import {AddContact, ContactCreated, ContactRepository, ContactRepositorySymbol} from '@dorders/model-contact';
import {Containers, waitForOnce} from '@dorders/fwk-model-test';

export class AddContactValidator extends AbstractContactValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1] = await this.containers.startContainers(2);

    const pWaitForProfileCreatedA = waitForOnce(container0, ProfileCreated.EVENT_NAME);
    const [profileACreated] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileA'}));
    const profileAId = profileACreated.body.profileId;
    await pWaitForProfileCreatedA;

    const pWaitForProfileCreatedB = waitForOnce(container1, ProfileCreated.EVENT_NAME);
    const [profileBCreated] = await container1.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileB'}));
    const serializedReference = await getSerializedPublicReference(container1, profileBCreated.body.profileId);
    await pWaitForProfileCreatedB;

    const pWaitForContactBCreated = waitForOnce(container0, ContactCreated.EVENT_NAME);
    const [contactBCreated] = await container0.messageBus.execute<ContactCreated>(new AddContact({
      profileId: profileAId,
      serializedReference
    }));
    expect(contactBCreated).toBeTruthy();
    expect(contactBCreated.body.profileId).toEqual(profileACreated.body.profileId);
    expect(contactBCreated.body.contactId).toEqual(profileBCreated.body.profileId);
    await pWaitForContactBCreated;

    const contactRepository0 = await container0.registry.resolve<ContactRepository>(ContactRepositorySymbol);
    const contacts = contactRepository0.iterate(profileACreated.body.profileId);
    const iterator = contacts[Symbol.asyncIterator]();
    expect((await iterator.next()).done).toBeFalsy();
    expect((await iterator.next()).done).toBeTruthy();
  }

}
