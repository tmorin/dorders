import {ProfileId} from '@dorders/model-profile';
import {ContactId} from './Contact';
import {Event} from '@dorders/framework';

export type ContactRenamedBody = {
  profileId: ProfileId
  contactId: ContactId
  oldName: string
  newName: string
}

/**
 * A contact has been renamed.
 */
export class ContactRenamed extends Event<ContactRenamedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ContactRenamed.name}`);

  constructor(body: ContactRenamedBody) {
    super(body, ContactRenamed.EVENT_NAME);
  }

}