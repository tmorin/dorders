import {AbstractContainedValidator, Containers} from '@dorders/infra-test';
import {CreateProfile, ProfileCardUpdated, ProfileCreated, UpdateProfileCard} from '@dorders/model-profile';

export class UpdateProfileCardValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0] = this.containers.instances;

    const [profileCreated] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'profileA'}));

    const updateProfileCard = new UpdateProfileCard({
      profileId: profileCreated.body.profileId,
      profileCard: 'profile0 bis'
    });
    const [profileCardUpdated] = await container0.messageBus.execute<ProfileCardUpdated>(updateProfileCard);
    expect(profileCardUpdated).toBeTruthy();
    expect(profileCreated.body.profileId).toEqual(updateProfileCard.body.profileId);
    expect(profileCardUpdated.body.profileId).toEqual(updateProfileCard.body.profileId);
    expect(profileCardUpdated.body.profileCard).toEqual(updateProfileCard.body.profileCard);
  }

}
