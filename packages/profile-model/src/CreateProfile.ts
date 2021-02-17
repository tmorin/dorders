import {Command, CommandHandler, EmptyResult, handleCommands} from '@tmorin/ddd-fwk-model-core';
import {PrivateProfileRepository} from './PrivateProfileRepository';
import {PrivateProfileFactory} from './PrivateProfileFactory';
import {ProfileCreated} from './ProfileCreated';
import {ProfileCardUpdated} from './ProfileCardUpdated';
import {ProfileCard} from './Profile';

export type CreateProfileBody = {
  profileCard: ProfileCard
}

/**
 * Create a new profile.
 */
export class CreateProfile extends Command<CreateProfileBody> {
  public static readonly COMMAND_NAME = Symbol.for(`profile/${CreateProfile.name}`);

  constructor(body: CreateProfileBody) {
    super(body, CreateProfile.COMMAND_NAME);
  }
}

@handleCommands(CreateProfile.COMMAND_NAME)
export class CreateProfileHandler implements CommandHandler<CreateProfile, EmptyResult> {

  constructor(
    private readonly privateProfileFactory: PrivateProfileFactory,
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
  }

  async handle(command: CreateProfile): Promise<[EmptyResult, [ProfileCreated, ProfileCardUpdated]]> {
    const privateProfile = await this.privateProfileFactory.createFromScratch();

    const profileCreated = new ProfileCreated({
      profileId: privateProfile.profileId
    });
    await privateProfile.applyProfileCreated(profileCreated);

    const profileCardUpdated = new ProfileCardUpdated({
      profileId: privateProfile.profileId,
      profileCard: command.body.profileCard
    });
    await privateProfile.applyProfileCardUpdated(profileCardUpdated);

    await this.privateProfileRepository.add(privateProfile);

    return [EmptyResult.from(command), [profileCreated, profileCardUpdated]];
  }

}
