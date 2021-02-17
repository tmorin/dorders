import {ProfileId} from '@dorders/profile-model';
import {ContactDeleted} from './ContactDeleted';
import {ContactId} from './Contact';
import {ContactFactory} from './ContactFactory';
import {Command, CommandHandler, EmptyResult, handleCommands} from '@tmorin/ddd-fwk-model-core';
import {ContactRepository} from './ContactRepository';
import {AddContact} from './AddContact';

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
export class RemoveContactHandler implements CommandHandler<RemoveContact, EmptyResult> {

  constructor(
    private readonly contactFactory: ContactFactory,
    private readonly contactRepository: ContactRepository
  ) {
  }

  async handle(msg: RemoveContact): Promise<[EmptyResult, [ContactDeleted]]> {
    const contact = await this.contactRepository.get(msg.body.profileId, msg.body.contactId);

    const contactDeleted = new ContactDeleted({
      profileId: contact.profileId,
      contactId: contact.contactId
    });

    await contact.applyContactDeleted(contactDeleted);

    await this.contactRepository.delete(contact);

    return [EmptyResult.create(), [contactDeleted]];
  }

}
