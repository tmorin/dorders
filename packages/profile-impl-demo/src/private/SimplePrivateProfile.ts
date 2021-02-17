import {
  PrivateProfile,
  PrivateProfileReference,
  ProfileCardUpdated,
  ProfileCreated,
  ProfileDeleted,
  ProfileId,
  ProfileSynchronized,
  PublicProfile
} from '@dorders/profile-model';
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

  static from(privateProfile: PrivateProfile): SimplePrivateProfile {
    if (privateProfile instanceof SimplePrivateProfile) {
      return privateProfile;
    }
    throw new Error(`PrivateProfile (${privateProfile}) is not a SimplePrivateProfile`);
  }

  // EVENTS

  async getReference(): Promise<PrivateProfileReference> {
    return new SimplePrivateProfileReference(this.profileId);
  }

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

  // UTILITIES

  async applyProfilesSynchronized(profilesSynchronized: ProfileSynchronized): Promise<void> {
  }

  async dispose() {
    this.publicMap.removeObservers();
    this.privateMap.removeObservers();
  }
}
