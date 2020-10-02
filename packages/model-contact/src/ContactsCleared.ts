import {ProfileId} from '@dorders/model-profile';
import {Event} from '@dorders/fwk-model-core';

export type ContactsClearedBody = {
  profileId: ProfileId
}

/**
 * The contacts of a profile have been cleared.
 */
export class ContactsCleared extends Event<ContactsClearedBody> {
  public static readonly EVENT_NAME = Symbol.for(`contact/${ContactsCleared.name}`);

  constructor(body: ContactsClearedBody) {
    super(body, ContactsCleared.EVENT_NAME);
  }

}
