import * as uuid from 'uuid';
import {PrivateProfile, PrivateProfileFactory, PrivateProfileReference, ProfileId} from '@dorders/model-profile';
import {SimplePrivateProfile} from './SimplePrivateProfile';
import {ProfileConfigProvider} from '../ProfileConfigProvider';
import {ProfileMap, ProfileMapKey, ProfileMapsRepository} from '../map';

export class SimplePrivateProfileFactory implements PrivateProfileFactory {

  constructor(
    private readonly profileConfigProvider: ProfileConfigProvider,
    private readonly profileMapsRepository: ProfileMapsRepository
  ) {
  }

  async createFromScratch(): Promise<PrivateProfile> {
    const repositoryId = this.profileConfigProvider.get().repositoryId;
    const profileId: ProfileId = uuid.v4();

    const privateMap = new ProfileMap(repositoryId);
    privateMap.set(ProfileMapKey.creationDate, (new Date()).toISOString()).done();

    const publicMap = new ProfileMap(repositoryId);

    this.profileMapsRepository.add({profileId, privateMap, publicMap});

    return new SimplePrivateProfile(repositoryId, profileId, privateMap, publicMap);
  }

  async createFromReference(privateProfileReference: PrivateProfileReference): Promise<PrivateProfile> {
    const repositoryId = this.profileConfigProvider.get().repositoryId;
    const profileId = privateProfileReference.profileId;

    const {privateMap, publicMap} = this.profileMapsRepository.get(profileId);

    return new SimplePrivateProfile(repositoryId, profileId, privateMap, publicMap);
  }

}

