import {ProfileId} from '@dorders/model-profile';
import {ContactId} from './Contact';
import {Event} from '@dorders/framework';

export type ContactAddedBody = {
  profileId: ProfileId
  contactId: ContactId
}

/**
 * A contact has been added.
 */
export class ContactCreated extends Event<ContactAddedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ContactCreated.name}`);

  constructor(body: ContactAddedBody) {
    super(body, ContactCreated.EVENT_NAME);
  }

}
