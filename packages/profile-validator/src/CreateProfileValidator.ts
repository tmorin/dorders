import {AbstractContainedValidator, Containers, waitForOnce} from '@dorders/fwk-model-test';
import {
  CreateProfile,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileCreated
} from '@dorders/profile-model';

export class CreateProfileValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0] = await this.containers.startContainers(1);

    const pWaitForEvents = waitForOnce(container0, ProfileCreated.EVENT_NAME);

    const [, [profileCreated]] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileA'}));
    expect(profileCreated).toBeTruthy();
    expect(profileCreated.body.profileId).toBeTruthy();

    await pWaitForEvents;

    const privateProfileRepository0 = await container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const profile0 = await privateProfileRepository0.get(profileCreated.body.profileId);
    expect(profile0).toBeTruthy();
    expect(profile0.publicProfile.card).toEqual('ProfileA');
  }

}
