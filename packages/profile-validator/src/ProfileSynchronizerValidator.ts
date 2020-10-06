import {AbstractContainedValidator, Containers, waitForOnce} from '@dorders/fwk-model-test';
import {
  CreateProfile,
  ImportProfile,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileCardUpdated,
  ProfileCreated,
  ProfileSynchronized,
  UpdateProfileCard
} from '@dorders/profile-model';

export class ProfileSynchronizerValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1] = await this.containers.startContainers(2);

    const [, [profileACreated0]] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'profileA'}));
    const profileA0 = await container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol).get(profileACreated0.body.profileId);
    const profileARef0 = await profileA0.getReference();
    const profileARefAsString = await profileARef0.serialize();

    let waitForSynchronization = waitForOnce(container1, ProfileSynchronized.EVENT_NAME);
    await container1.messageBus.execute<ProfileCreated>(new ImportProfile({serializedReference: profileARefAsString}));
    await waitForSynchronization;

    waitForSynchronization = waitForOnce(container1, ProfileSynchronized.EVENT_NAME, ProfileCardUpdated.EVENT_NAME);
    await container0.messageBus.execute(new UpdateProfileCard({
      profileId: profileACreated0.body.profileId,
      profileCard: 'profile card bis'
    }))
    await waitForSynchronization;
  }

}
