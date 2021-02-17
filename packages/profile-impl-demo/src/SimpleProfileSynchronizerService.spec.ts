import {DemoContainers} from './__helpers__/container';
import {
  PrivateProfileFactory,
  PrivateProfileFactorySymbol,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileSynchronized,
  ProfileSynchronizerService,
  ProfileSynchronizerServiceSymbol
} from '@dorders/profile-model';
import {SimplePrivateProfile} from './private';
import {Container} from '@tmorin/ddd-fwk-model-core';
import {waitForMany} from '@tmorin/ddd-fwk-model-test';

describe('SimpleProfileSynchronizerService', function () {

  let containers: DemoContainers;
  let container0: Container;
  let container1: Container;
  let container2: Container;
  beforeEach(async function () {
    containers = new DemoContainers();
    [container0, container1, container2] = await containers.startContainers(3);
  });
  afterEach(async function () {
    await containers.disposeContainers();
  });

  it('should synchronize profiles', async function () {

    const waitProfileSynchronized0 = waitForMany(container0, ProfileSynchronized.EVENT_NAME, 1);
    const waitProfileSynchronized1 = waitForMany(container1, ProfileSynchronized.EVENT_NAME, 1);
    const waitProfileSynchronized2 = waitForMany(container2, ProfileSynchronized.EVENT_NAME, 2);

    const privateProfileFactory0 = container0.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);
    const privateProfileRepository0 = container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const privateProfile0A = await privateProfileFactory0.createFromScratch();
    const privateProfileReferenceA = await privateProfile0A.getReference();
    await privateProfileRepository0.add(privateProfile0A);

    const profileSynchronizerService0 = container0.registry.resolve<ProfileSynchronizerService>(ProfileSynchronizerServiceSymbol);
    await profileSynchronizerService0.startOngoingSynchronization(privateProfile0A.profileId);

    const privateProfileFactory1 = container1.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);
    const privateProfileRepository1 = container1.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const privateProfile1A = await privateProfileFactory1.createFromReference(privateProfileReferenceA);
    await privateProfileRepository1.add(privateProfile1A);

    const profileSynchronizerService1 = container1.registry.resolve<ProfileSynchronizerService>(ProfileSynchronizerServiceSymbol);
    await profileSynchronizerService1.startOngoingSynchronization(privateProfile1A.profileId);

    const privateProfileFactory2 = container2.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);
    const privateProfileRepository2 = container2.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const privateProfile2A = await privateProfileFactory2.createFromReference(privateProfileReferenceA);
    await privateProfileRepository2.add(privateProfile2A);

    const profileSynchronizerService2 = container2.registry.resolve<ProfileSynchronizerService>(ProfileSynchronizerServiceSymbol);
    await profileSynchronizerService2.startOngoingSynchronization(privateProfile2A.profileId);

    const simplePrivateProfile0A = SimplePrivateProfile.from(privateProfile0A);
    const simplePrivateProfile1A = SimplePrivateProfile.from(privateProfile1A);
    const simplePrivateProfile2A = SimplePrivateProfile.from(privateProfile2A);

    expect(simplePrivateProfile0A.privateMap.size).toBe(1);
    expect(simplePrivateProfile1A.privateMap.size).toBe(1);
    expect(simplePrivateProfile2A.privateMap.size).toBe(1);

    simplePrivateProfile0A.privateMap.set('valA', 'key0A').set('valB', 'key0A').set('valC', 'key0A');
    simplePrivateProfile0A.privateMap.done();

    expect(simplePrivateProfile0A.privateMap.size).toBe(4);
    expect(simplePrivateProfile1A.privateMap.size).toBe(4);
    expect(simplePrivateProfile2A.privateMap.size).toBe(4);

    simplePrivateProfile1A.publicMap.set('valA', 'key1A').set('valB', 'key1A').set('valC', 'key1A');
    simplePrivateProfile1A.publicMap.done();

    expect(simplePrivateProfile0A.publicMap.size).toBe(3);
    expect(simplePrivateProfile1A.publicMap.size).toBe(3);
    expect(simplePrivateProfile2A.publicMap.size).toBe(3);

    await waitProfileSynchronized0;
    await waitProfileSynchronized1;
    await waitProfileSynchronized2;
  })

})
