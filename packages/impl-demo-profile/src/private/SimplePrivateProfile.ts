import {
  PrivateProfile,
  PrivateProfileReference,
  ProfileCardUpdated,
  ProfileCreated,
  ProfileDeleted,
  ProfileId,
  ProfileSynchronized,
  PublicProfile
} from '@dorders/model-profile';
import {SimplePublicProfile} from '../public';
import {SimplePrivateProfileReference} from './SimplePrivateProfileReference';
import {ProfileMap, ProfileMapKey} from '../map';

export class SimplePrivateProfile implements PrivateProfile {

  constructor(
    public readonly repositoryId: string,
    public readonly profileId: ProfileId,
    public readonly privateMap = new ProfileMap(repositoryId),
    public readonly publicMap = new ProfileMap(repositoryId),
    public readonly publicProfile: PublicProfile = new SimplePublicProfile(repositoryId, profileId, publicMap)
  ) {
  }

  async getReference(): Promise<PrivateProfileReference> {
    return new SimplePrivateProfileReference(this.repositoryId, this.profileId);
  }

  // EVENTS

  async applyProfileCardUpdated(profileCardUpdated: ProfileCardUpdated): Promise<void> {
    const cardAsString = typeof profileCardUpdated.body.profileCard === 'string'
      ? profileCardUpdated.body.profileCard
      : JSON.stringify(profileCardUpdated.body.profileCard);
    this.publicMap.set(ProfileMapKey.publicCard, cardAsString);
    this.publicMap.done();
  }

  async applyProfileCreated(profileCreated: ProfileCreated): Promise<void> {
  }

  async applyProfileDeleted(profileDeleted: ProfileDeleted): Promise<void> {
    await this.dispose();
  }

  async applyProfilesSynchronized(profilesSynchronized: ProfileSynchronized): Promise<void> {
  }

  // UTILITIES

  async dispose() {
    this.publicMap.removeObservers();
    this.privateMap.removeObservers();
  }

}
