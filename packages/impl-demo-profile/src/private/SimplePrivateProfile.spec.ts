import {SimplePrivateProfile} from './SimplePrivateProfile';
import {PrivateProfile, ProfileId} from '@dorders/profile-model';
import {ProfileMap} from '../map';

describe('SimplePrivateProfile', function () {
  let repositoryId: string;
  let profileId: ProfileId;
  let publicMap: ProfileMap;
  let privateMap: ProfileMap;
  let privateProfile: PrivateProfile;

  beforeEach(function () {
    repositoryId = 'repositoryId';
    profileId = 'profileId';
    publicMap = new ProfileMap('RepoA');
    privateMap = new ProfileMap('RepoA');
    privateProfile = new SimplePrivateProfile(repositoryId, profileId, privateMap, publicMap);
  })

  it('should have a public reference', async function () {
    const publicReference = await privateProfile.getReference();
    expect(publicReference).toBeTruthy();
  })

})
