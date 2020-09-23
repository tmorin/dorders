import {Container} from '@dorders/framework';
import {disposeContainers, waitForOnce} from '@dorders/infra-test';
import {
  CreateProfile,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileCreated
} from '@dorders/model-profile';
import {startDemoContainers} from './__helpers__/container';

describe('CreateProfile', function () {

  let container0: Container;
  beforeEach(async function () {
    [container0] = await startDemoContainers(1);
  });
  afterEach(async function () {
    await disposeContainers();
  });

  it('should succeed', async function () {
    const pWaitForEvents = waitForOnce(container0, ProfileCreated.EVENT_NAME);

    const [profileCreated] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileA'}));
    expect(profileCreated).toBeTruthy();
    expect(profileCreated.body.profileId).toBeTruthy();

    const privateProfileRepository0 = await container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const profile0 = await privateProfileRepository0.get(profileCreated.body.profileId);
    expect(profile0).toBeTruthy();
    expect(profile0.publicProfile.card).toEqual('ProfileA');

    await pWaitForEvents;
  });

});
