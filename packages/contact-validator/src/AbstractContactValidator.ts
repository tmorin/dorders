import {Container} from '@dorders/fwk-model-core';
import {
  CreateProfile,
  ImportProfile,
  PrivateProfileReference,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileCard,
  ProfileCreated,
  ProfileId,
  PublicProfileReference,
  SerializedPrivateProfileReference,
  SerializedPublicProfileReference
} from '@dorders/profile-model';
import {AddContact, ContactCreated, ContactDeleted, ContactId, RemoveContact} from '@dorders/contact-model';
import {AbstractContainedValidator, Containers, waitForOnce} from '@dorders/fwk-model-test';

export async function getPrivateReference(container: Container, profileId: ProfileId): Promise<PrivateProfileReference> {
  const repository = container.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
  const profile = await repository.get(profileId);
  return await profile.getReference();
}

export async function getPublicReference(container: Container, profileId: ProfileId): Promise<PublicProfileReference> {
  const repository = container.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
  const profile = await repository.get(profileId);
  return await profile.publicProfile.getReference();
}

export async function getSerializedPublicReference(container: Container, profileId: ProfileId): Promise<SerializedPublicProfileReference> {
  const reference = await getPublicReference(container, profileId);
  return await reference.serialize();
}

export async function getSerializedPrivateReference(container: Container, profileId: ProfileId): Promise<SerializedPrivateProfileReference> {
  const reference = await getPrivateReference(container, profileId);
  return await reference.serialize();
}

export abstract class AbstractContactValidator extends AbstractContainedValidator {

  protected constructor(
    containers: Containers
  ) {
    super(containers);
  }

  protected async createProfile(container: Container, profileCard: ProfileCard) {
    const pWaitForProfileCreated = waitForOnce(container, ProfileCreated.EVENT_NAME);
    const [profileACreated] = await container.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard}));
    const profileId = profileACreated.body.profileId;
    await pWaitForProfileCreated;
    return profileId;
  }

  protected async importProfile(oContainer: Container, dContainer: Container, profileId: ProfileId) {
    const pWaitForProfileCreated = waitForOnce(dContainer, ProfileCreated.EVENT_NAME);
    const serializedReference = await getSerializedPrivateReference(oContainer, profileId)
    await dContainer.messageBus.execute<ProfileCreated>(new ImportProfile({serializedReference}));
    await pWaitForProfileCreated;
  }

  protected async addContacts(fContainer: Container, tContainer: Container, profileId: ProfileId, num: number): Promise<Array<ContactId>> {
    const contactIds: Array<ContactId> = [];
    for (let i = 0; i < num; i++) {
      // create profile
      const pWaitForProfileCreated = waitForOnce(tContainer, ProfileCreated.EVENT_NAME);
      const [profileCreated] = await tContainer.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: `Profile${num}`}));
      const serializedReference = await getSerializedPublicReference(tContainer, profileCreated.body.profileId);
      await pWaitForProfileCreated;
      // add created profile as profile
      const pWaitForContactCreated = waitForOnce(fContainer, ContactCreated.EVENT_NAME);
      const [contactCreated] = await fContainer.messageBus.execute<ContactCreated>(new AddContact({
        profileId,
        serializedReference
      }));
      contactIds.push(contactCreated.body.contactId);
      await pWaitForContactCreated;
    }
    return contactIds;
  }

  protected async addContact(containerA: Container, profileIdA: ProfileId, containerB: Container, profileIdB: ProfileId): Promise<ContactId> {
    const serializedReference = await getSerializedPublicReference(containerB, profileIdB);
    const pWaitForContactCreated = waitForOnce(containerA, ContactCreated.EVENT_NAME);
    const [contactCreated] = await containerA.messageBus.execute<ContactCreated>(new AddContact({
      profileId: profileIdA,
      serializedReference
    }));
    await pWaitForContactCreated;
    return contactCreated.body.contactId;
  }

  protected async removeContact(fContainer: Container, tContainer: Container, profileId: ProfileId, contactId: ContactId): Promise<void> {
    await fContainer.messageBus.execute<ContactDeleted>(new RemoveContact({
      profileId,
      contactId
    }));
  }

}
