import {ProfileId} from '@dorders/profile-model';
import {ContactId} from './Contact';
import {Event} from '@dorders/fwk-model-core';

export type ContactAddedBody = {
  profileId: ProfileId
  contactId: ContactId
}

/**
 * A contact has been added.
 */
export class ContactCreated extends Event<ContactAddedBody> {
  public static readonly EVENT_NAME = Symbol.for(`contact/${ContactCreated.name}`);

  constructor(body: ContactAddedBody) {
    super(body, ContactCreated.EVENT_NAME);
  }

}
