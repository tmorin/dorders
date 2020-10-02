import {SimplePrivateProfile} from '../../../profile-impl-demo';
import {Container} from '@dorders/fwk-model-core';
import {
  PrivateProfileFactory,
  PrivateProfileFactorySymbol,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileCardUpdated,
  ProfileId
} from '@dorders/profile-model';
import {SimpleContact} from '../SimpleContact';
import {ContactFactory, ContactFactorySymbol} from '@dorders/contact-model';

export async function createPrivateProfile(container: Container, name?: string): Promise<SimplePrivateProfile> {
  const privateProfileFactory = container.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);
  const privateProfileRepository = container.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
  const privateProfile = await privateProfileFactory.createFromScratch();
  if (name) {
    await privateProfile.applyProfileCardUpdated(new ProfileCardUpdated({
      profileId: privateProfile.profileId,
      profileCard: name
    }));
  }
  await privateProfileRepository.add(privateProfile);
  return SimplePrivateProfile.from(privateProfile);
}

export async function createContact(container: Container, profileId: ProfileId, profile: SimplePrivateProfile): Promise<SimpleContact> {
  const profileBPubRef = await profile.publicProfile.getReference();
  const contactFactory = container.registry.resolve<ContactFactory>(ContactFactorySymbol);
  return SimpleContact.from(await contactFactory.createFromReference(profileId, profileBPubRef));
}

export async function toArray<T>(iterable: AsyncIterable<T>): Promise<Array<T>> {
  const entries: Array<T> = [];
  for await (const entry of iterable) {
    entries.push(entry);
  }
  return entries;
}
