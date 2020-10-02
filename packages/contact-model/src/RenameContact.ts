import {ProfileId} from '@dorders/model-profile';
import {ContactRenamed} from './ContactRenamed';
import {ContactId} from './Contact';
import {ContactFactory} from './ContactFactory';
import {Command, CommandHandler, handleCommands} from '@dorders/fwk-model-core';
import {ContactRepository} from './ContactRepository';

export type RenameContactBody = {
  profileId: ProfileId
  contactId: ContactId
  newName: string
}

/**
 * Rename a contact.
 */
export class RenameContact extends Command<RenameContactBody> {
  public static readonly COMMAND_NAME = Symbol.for(`profile/${RenameContact.name}`);

  constructor(body: RenameContactBody) {
    super(body, RenameContact.COMMAND_NAME);
  }

}

@handleCommands(RenameContact.COMMAND_NAME)
export class RenameContactHandler implements CommandHandler<RenameContact> {

  constructor(
    private readonly contactFactory: ContactFactory,
    private readonly contactRepository: ContactRepository
  ) {
  }

  async handle(msg: RenameContact): Promise<[ContactRenamed]> {
    const contact = await this.contactRepository.get(msg.body.profileId, msg.body.contactId);

    const contactRenamed = new ContactRenamed({
      profileId: contact.profileId,
      contactId: contact.contactId,
      newName: msg.body.newName,
      oldName: contact.name
    });
    await contact.applyContactRenamed(contactRenamed);

    await this.contactRepository.persist(contact);

    return [contactRenamed];
  }

}
