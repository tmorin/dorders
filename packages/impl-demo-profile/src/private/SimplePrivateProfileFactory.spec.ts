import {Container} from '@dorders/framework';
import {startDemoContainers} from '../__helpers__/container';
import {disposeContainers} from '@dorders/infra-test';
import {PrivateProfileFactory, PrivateProfileFactorySymbol} from '@dorders/model-profile';
import {SimplePrivateProfile} from './SimplePrivateProfile';
import {ProfileMapKey} from '../map';

describe('SimplePrivateProfileFactory', function () {

  let container0: Container;
  let container1: Container;
  beforeEach(async function () {
    [container0, container1] = await startDemoContainers(2);
  });
  afterEach(async function () {
    await disposeContainers();
  });

  it('should create from scratch', async function () {
    const privateProfileFactory0 = container0.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);
    const privateProfile0A = await privateProfileFactory0.createFromScratch();
    expect(privateProfile0A).toBeTruthy();
    expect(privateProfile0A.profileId).toBeTruthy();
    expect(privateProfile0A.publicProfile).toBeTruthy();
  })

  it('should create from reference', async function () {
    const privateProfileFactory0 = container0.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);
    const privateProfile0A = await privateProfileFactory0.createFromScratch();
    const privateProfileReferenceA = await privateProfile0A.getReference();

    const privateProfileFactory1 = container1.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);
    const privateProfile1A = await privateProfileFactory1.createFromReference(privateProfileReferenceA);
    expect(privateProfile1A.profileId).toBe(privateProfile0A.profileId);

    expect(privateProfile0A).toBeInstanceOf(SimplePrivateProfile);
    expect(privateProfile1A).toBeInstanceOf(SimplePrivateProfile);
    expect(
      SimplePrivateProfile.from(privateProfile0A).privateMap.get(ProfileMapKey.creationDate)
    ).toBe(
      SimplePrivateProfile.from(privateProfile1A).privateMap.get(ProfileMapKey.creationDate)
    );
  })

})
