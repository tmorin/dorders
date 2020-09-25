import {Command, CommandHandler, handleCommands} from '@dorders/framework';
import {ProfileId, PublicProfileReferenceDeserializer, SerializedPublicProfileReference} from '@dorders/model-profile';
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
export class AddContactHandler implements CommandHandler<AddContact> {

  constructor(
    private readonly contactFactory: ContactFactory,
    private readonly contactRepository: ContactRepository,
    private readonly publicProfileReferenceDeserializer: PublicProfileReferenceDeserializer
  ) {
  }

  async handle(msg: AddContact): Promise<[ContactCreated]> {
    const {profileId, serializedReference} = msg.body;

    const publicProfileReference = await this.publicProfileReferenceDeserializer.deserialize(serializedReference);

    const contact = await this.contactFactory.createFromReference(profileId, publicProfileReference);

    const contactCreated = new ContactCreated({
      profileId: contact.profileId,
      contactId: contact.contactId
    });

    await contact.applyContactCreated(contactCreated);

    await this.contactRepository.persist(contact);

    return [contactCreated];
  }

}