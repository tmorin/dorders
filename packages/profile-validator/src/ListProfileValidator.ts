import {AbstractContainedValidator, Containers, waitForMany} from '@tmorin/ddd-fwk-model-test';
import {CreateProfile, ListProfilesQuery, ListProfilesResult, ProfileCreated} from '@dorders/profile-model';

export class ListProfileValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0] = await this.containers.startContainers(1);

    const pWaitForEvents = waitForMany(container0, ProfileCreated.EVENT_NAME, 2);
    await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileA'}));
    await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileB'}));
    await pWaitForEvents;

    const result = await container0.messageBus.call<ListProfilesResult>(new ListProfilesQuery());
    expect(result).toBeTruthy();
    expect(result.body.profiles.length).toBe(2);
  }

}
