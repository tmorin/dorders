import {PrivateProfileRepository} from './PrivateProfileRepository';
import {ProfileId} from './Profile';
import {ProfileDeleted} from './ProfileDeleted';
import {Command, CommandHandler, EmptyResult, handleCommands} from '@tmorin/ddd-fwk-model-core';

export type DeleteProfileBody = {
  profileId: ProfileId
}

/**
 * Delete a profile.
 */
export class DeleteProfile extends Command<DeleteProfileBody> {
  public static readonly COMMAND_NAME = Symbol.for(`profile/${DeleteProfile.name}`);

  constructor(body: DeleteProfileBody) {
    super(body, DeleteProfile.COMMAND_NAME);
  }
}

@handleCommands(DeleteProfile.COMMAND_NAME)
export class DeleteProfileHandler implements CommandHandler<DeleteProfile, EmptyResult> {

  constructor(
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
  }

  async handle(message: DeleteProfile): Promise<[EmptyResult, [ProfileDeleted]]> {
    const privateProfile = await this.privateProfileRepository.get(message.body.profileId);

    const profileDeleted = new ProfileDeleted({
      profileId: privateProfile.profileId
    });
    await privateProfile.applyProfileDeleted(profileDeleted);

    await this.privateProfileRepository.remove(privateProfile);

    return [EmptyResult.create(), [profileDeleted]];
  }

}
