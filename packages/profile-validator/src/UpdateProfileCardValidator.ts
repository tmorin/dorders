import {AbstractContainedValidator, Containers} from '@dorders/fwk-model-test';
import {CreateProfile, ProfileCardUpdated, ProfileCreated, UpdateProfileCard} from '@dorders/profile-model';

export class UpdateProfileCardValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0] = await this.containers.startContainers(1);

    const [, [profileCreated]] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'profileA'}));

    const updateProfileCard = new UpdateProfileCard({
      profileId: profileCreated.body.profileId,
      profileCard: 'profile0 bis'
    });
    const [, [profileCardUpdated]] = await container0.messageBus.execute<ProfileCardUpdated>(updateProfileCard);
    expect(profileCardUpdated).toBeTruthy();
    expect(profileCreated.body.profileId).toEqual(updateProfileCard.body.profileId);
    expect(profileCardUpdated.body.profileId).toEqual(updateProfileCard.body.profileId);
    expect(profileCardUpdated.body.profileCard).toEqual(updateProfileCard.body.profileCard);
  }

}
