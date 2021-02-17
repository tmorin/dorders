import {Command, CommandHandler, EmptyResult, handleCommands} from '@tmorin/ddd-fwk-model-core';
import {PrivateProfileRepository} from './PrivateProfileRepository';
import {ProfileCard, ProfileId} from './Profile';
import {ProfileCardUpdated} from './ProfileCardUpdated';

export type UpdateProfileCardBody = {
  profileId: ProfileId
  profileCard: ProfileCard
}

export class UpdateProfileCard extends Command<UpdateProfileCardBody> {
  public static readonly COMMAND_NAME = Symbol.for(`profile/${UpdateProfileCard.name}`);

  constructor(body: UpdateProfileCardBody) {
    super(body, UpdateProfileCard.COMMAND_NAME);
  }
}

@handleCommands(UpdateProfileCard.COMMAND_NAME)
export class UpdateProfileCardHandler implements CommandHandler<UpdateProfileCard, EmptyResult> {

  constructor(
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
  }

  async handle(command: UpdateProfileCard): Promise<[EmptyResult, [ProfileCardUpdated]]> {
    const privateProfile = await this.privateProfileRepository.get(command.body.profileId);
    const profileCardUpdated = new ProfileCardUpdated({
      profileId: privateProfile.profileId,
      profileCard: command.body.profileCard
    })
    await privateProfile.applyProfileCardUpdated(profileCardUpdated);
    return [EmptyResult.from(command), [profileCardUpdated]];
  }

}
