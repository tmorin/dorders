import {ProfileId} from '@dorders/profile-model';
import {ContactId} from './Contact';
import {Event} from '@dorders/fwk-model-core';

export type ContactDeletedBody = {
  profileId: ProfileId
  contactId: ContactId
}

/**
 * A contact has been removed.
 */
export class ContactDeleted extends Event<ContactDeletedBody> {
  public static readonly EVENT_NAME = Symbol.for(`contact/${ContactDeleted.name}`);

  constructor(body: ContactDeletedBody) {
    super(body, ContactDeleted.EVENT_NAME);
  }

}
