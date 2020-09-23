import {ProfileId} from '@dorders/model-profile';
import {ContactDeleted} from './ContactDeleted';
import {ContactId} from './Contact';
import {ContactFactory} from './ContactFactory';
import {Command, CommandHandler, handleCommands} from '@dorders/framework';
import {ContactRepository} from './ContactRepository';

export type RemoveContactBody = {
  profileId: ProfileId
  contactId: ContactId
}

/**
 * Remove a contact.
 */
export class RemoveContact extends Command<RemoveContactBody> {
  public static readonly COMMAND_NAME = Symbol.for(`profile/${RemoveContact.name}`);

  constructor(body: RemoveContactBody) {
    super(body, RemoveContact.COMMAND_NAME);
  }

}

@handleCommands(RemoveContact.COMMAND_NAME)
export class RemoveContactHandler implements CommandHandler<RemoveContact> {

  constructor(
    private readonly contactFactory: ContactFactory,
    private readonly contactRepository: ContactRepository
  ) {
  }

  async handle(msg: RemoveContact): Promise<[ContactDeleted]> {
    const contact = await this.contactRepository.get(msg.body.profileId, msg.body.contactId);

    const contactDeleted = new ContactDeleted({
      profileId: contact.profileId,
      contactId: contact.contactId
    });

    await contact.applyContactDeleted(contactDeleted);

    await this.contactRepository.delete(contact);

    return [contactDeleted];
  }

}
