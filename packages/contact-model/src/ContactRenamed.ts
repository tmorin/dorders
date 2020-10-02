import {ProfileId} from '@dorders/profile-model';
import {ContactId} from './Contact';
import {Event} from '@dorders/fwk-model-core';

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
  public static readonly EVENT_NAME = Symbol.for(`contact/${ContactRenamed.name}`);

  constructor(body: ContactRenamedBody) {
    super(body, ContactRenamed.EVENT_NAME);
  }

}
