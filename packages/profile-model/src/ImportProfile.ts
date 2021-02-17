import {PrivateProfileRepository} from './PrivateProfileRepository';
import {PrivateProfileFactory} from './PrivateProfileFactory';
import {ProfileCreated} from './ProfileCreated';
import {SerializedPrivateProfileReference} from './PrivateProfile';
import {PrivateProfileReferenceDeserializer} from './PrivateProfileReferenceDeserializer';
import {Command, CommandHandler, EmptyResult, handleCommands} from '@tmorin/ddd-fwk-model-core';

export type ImportProfileBody = {
  serializedReference: SerializedPrivateProfileReference
}

/**
 * Import a profile.
 */
export class ImportProfile extends Command<ImportProfileBody> {
  public static readonly COMMAND_NAME = Symbol.for(`profile/${ImportProfile.name}`);

  constructor(body: ImportProfileBody) {
    super(body, ImportProfile.COMMAND_NAME);
  }
}

@handleCommands(ImportProfile.COMMAND_NAME)
export class ImportProfileHandler implements CommandHandler<ImportProfile, EmptyResult> {

  constructor(
    private readonly privateProfileReferenceDeserializer: PrivateProfileReferenceDeserializer,
    private readonly privateProfileFactory: PrivateProfileFactory,
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
  }

  async handle(message: ImportProfile): Promise<[EmptyResult, [ProfileCreated]]> {
    const privateProfileReference = await this.privateProfileReferenceDeserializer.deserialize(message.body.serializedReference);
    const privateProfile = await this.privateProfileFactory.createFromReference(privateProfileReference);

    const profileCreated = new ProfileCreated({
      profileId: privateProfile.profileId
    });
    await privateProfile.applyProfileCreated(profileCreated);

    await this.privateProfileRepository.add(privateProfile);

    return [EmptyResult.create(), [profileCreated]];
  }

}
