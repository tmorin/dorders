import {ProfileId} from '@dorders/model-profile';
import {Event} from '@dorders/framework';

export type ContactsClearedBody = {
  profileId: ProfileId
}

/**
 * The contacts of a profile have been cleared.
 */
export class ContactsCleared extends Event<ContactsClearedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ContactsCleared.name}`);

  constructor(body: ContactsClearedBody) {
    super(body, ContactsCleared.EVENT_NAME);
  }

}
