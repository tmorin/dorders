import {AbstractContainedValidator, Containers, waitForOnce} from '@dorders/fwk-model-test';
import {CreateProfile, GetProfileQuery, GetProfileResult, ProfileCreated} from '@dorders/profile-model';

export class GetProfileValidator extends AbstractContainedValidator {

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

    const result = await container0.messageBus.call<GetProfileResult>(new GetProfileQuery({
      profileId: profileCreated.body.profileId
    }));
    expect(result).toBeTruthy();
    expect(result.body.profileId).toBe(profileCreated.body.profileId);
  }

}
