import {Command, CommandHandler, EmptyResult, handleCommands} from '@tmorin/ddd-fwk-model-core';
import {ProfileId, PublicProfileReferenceDeserializer, SerializedPublicProfileReference} from '@dorders/profile-model';
import {ContactCreated} from './ContactCreated';
import {ContactFactory} from './ContactFactory';
import {ContactRepository} from './ContactRepository';

export type AddContactBody = {
  profileId: ProfileId
  serializedReference: SerializedPublicProfileReference
}

/**
 * Add a contact.
 */
export class AddContact extends Command<AddContactBody> {
  public static readonly COMMAND_NAME = Symbol.for(`profile/${AddContact.name}`);

  constructor(body: AddContactBody) {
    super(body, AddContact.COMMAND_NAME);
  }
}

@handleCommands(AddContact.COMMAND_NAME)
export class AddContactHandler implements CommandHandler<AddContact, EmptyResult> {

  constructor(
    private readonly contactFactory: ContactFactory,
    private readonly contactRepository: ContactRepository,
    private readonly publicProfileReferenceDeserializer: PublicProfileReferenceDeserializer
  ) {
  }

  async handle(command: AddContact): Promise<[EmptyResult, [ContactCreated]]> {
    const {profileId, serializedReference} = command.body;

    const publicProfileReference = await this.publicProfileReferenceDeserializer.deserialize(serializedReference);

    const contact = await this.contactFactory.createFromReference(profileId, publicProfileReference);

    const contactCreated = new ContactCreated({
      profileId: contact.profileId,
      contactId: contact.contactId
    });

    await contact.applyContactCreated(contactCreated);

    await this.contactRepository.persist(contact);

    return [EmptyResult.from(command), [contactCreated]];
  }

}
