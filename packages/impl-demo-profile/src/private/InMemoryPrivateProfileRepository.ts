import {PrivateProfile, PrivateProfileRepository, ProfileId} from '@dorders/model-profile';
import {SimplePrivateProfile} from './SimplePrivateProfile';

export class InMemoryPrivateProfileRepository implements PrivateProfileRepository {

  constructor(
    private readonly map = new Map<ProfileId, PrivateProfile>()
  ) {
  }

  async add(privateProfile: PrivateProfile): Promise<void> {
    if (this.map.has(privateProfile.profileId)) {
      throw new Error(`PrivateProfile (${privateProfile.profileId}) already managed`);
    }
    this.map.set(privateProfile.profileId, privateProfile);
  }

  async get(profileId: ProfileId): Promise<PrivateProfile> {
    if (!this.map.has(profileId)) {
      throw new Error(`PrivateProfile (${profileId}) not found`);
    }
    return this.map.get(profileId);
  }

  iterate(): AsyncIterable<PrivateProfile> {
    const iterator = this.map[Symbol.iterator]();
    const next = async () => {
      const result = iterator.next();
      if (result.done) {
        return {done: true, value: null};
      }
      return {done: false, value: result.value};
    };
    return {
      [Symbol.asyncIterator]: () => ({next})
    }
  }

  async list(): Promise<Array<PrivateProfile>> {
    const privateProfiles: Array<PrivateProfile> = [];
    for (const privateProfile of this.map.values()) {
      privateProfiles.push(privateProfile)
    }
    return privateProfiles;
  }

  async remove(privateProfile: PrivateProfile): Promise<void> {
    if (!this.map.has(privateProfile.profileId)) {
      throw new Error(`PrivateProfile (${privateProfile.profileId}) not found`);
    }
    this.map.delete(privateProfile.profileId);
  }

  async dispose() {
    for (const privateProfile of this.map.values()) {
      if (privateProfile instanceof SimplePrivateProfile) {
        await privateProfile.dispose();
      }
    }
  }
  
}
