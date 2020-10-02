import {ProfileId} from '@dorders/profile-model';
import {ProfileMaps} from './ProfileMaps';
import {ProfileConfigProvider} from '../ProfileConfigProvider';

export const ProfileMapsRepositorySymbol = Symbol.for('ProfileMapsRepository');

const PROFILE_MAPS = new Map<ProfileId, ProfileMaps>();

export class ProfileMapsRepository {

  constructor(
    private readonly profileConfigProvider: ProfileConfigProvider
  ) {
  }

  add(profileMaps: ProfileMaps) {
    PROFILE_MAPS.set(profileMaps.profileId, profileMaps);
  }

  get(profileId: ProfileId): ProfileMaps {
    const repositoryId = this.profileConfigProvider.get().repositoryId;
    const {privateMap, publicMap} = PROFILE_MAPS.get(profileId);
    return {
      profileId,
      privateMap: privateMap.clone(repositoryId),
      publicMap: publicMap.clone(repositoryId)
    };
  }

}
