import {AbstractContainedValidator, Containers, waitForOnce} from '@tmorin/ddd-fwk-model-test';
import {CreateProfile, ProfileCreated, ProfilesLoaded} from '@dorders/profile-model';
import {LocalPeerStarted} from '@dorders/peer-model';

export class ProfilesLoaderValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0] = await this.containers.startContainers(1);

    await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'profileA'}));
    await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'profileB'}));

    let cntProfileCreated = 0;
    container0.messageBus.on(ProfileCreated.EVENT_NAME, () => cntProfileCreated += 1);

    const pWaitForEvents = waitForOnce(container0, ProfilesLoaded.EVENT_NAME);

    await container0.messageBus.publish(new LocalPeerStarted({peerId: 'an identifier'}));
    await pWaitForEvents;

    expect(cntProfileCreated).toEqual(2);
  }

}
