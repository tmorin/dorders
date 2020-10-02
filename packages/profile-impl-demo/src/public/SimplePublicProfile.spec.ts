import {SimplePublicProfile} from './SimplePublicProfile';
import {ProfileMap, ProfileMapKey} from '../map';

describe('SimplePublicProfile', function () {

  let map: ProfileMap
  beforeEach(function () {
    map = new ProfileMap('RepoA');
  })

  it('should provide a reference', async function () {
    const simplePublicProfile = new SimplePublicProfile('repositoryId', 'profileId', map);
    const reference = await simplePublicProfile.getReference();
    expect(reference).toBeTruthy();
    expect(reference.profileId).toBe('profileId');
    expect(reference.name).toBe('profileId');
  })

  it('should provide a reference with card as JSON', async function () {
    map.set(ProfileMapKey.publicCard, JSON.stringify({name: 'john doe'}));
    const simplePublicProfile = new SimplePublicProfile('repositoryId', 'profileId', map);
    const reference = await simplePublicProfile.getReference();
    expect(reference).toBeTruthy();
    expect(reference.profileId).toBe('profileId');
    expect(reference.name).toBe('john doe');
  })

  it('should provide a reference with card as string', async function () {
    map.set(ProfileMapKey.publicCard, 'john doe');
    const simplePublicProfile = new SimplePublicProfile('repositoryId', 'profileId', map);
    const reference = await simplePublicProfile.getReference();
    expect(reference).toBeTruthy();
    expect(reference.profileId).toBe('profileId');
    expect(reference.name).toBe('john doe');
  })

  it('should provide a reference with card and alternate name', async function () {
    map.set(ProfileMapKey.publicCard, JSON.stringify({alternateName: 'john doe'}));
    const simplePublicProfile = new SimplePublicProfile('repositoryId', 'profileId', map);
    const reference = await simplePublicProfile.getReference();
    expect(reference).toBeTruthy();
    expect(reference.profileId).toBe('profileId');
    expect(reference.name).toBe('john doe');
  })

  it('should provide a reference with card and no names', async function () {
    map.set(ProfileMapKey.publicCard, JSON.stringify({}));
    const simplePublicProfile = new SimplePublicProfile('repositoryId', 'profileId', map);
    const reference = await simplePublicProfile.getReference();
    expect(reference).toBeTruthy();
    expect(reference.profileId).toBe('profileId');
    expect(reference.name).toBe('profileId');
  })

})
