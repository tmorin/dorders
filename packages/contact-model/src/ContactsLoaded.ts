import {ProfileId} from '@dorders/profile-model';
import {Event} from '@tmorin/ddd-fwk-model-core';

export type ContactLoadedBody = {
  profileId: ProfileId
}

/**
 * The contacts of a profile have been loaded.
 */
export class ContactsLoaded extends Event<ContactLoadedBody> {
  public static readonly EVENT_NAME = Symbol.for(`contact/${ContactsLoaded.name}`);

  constructor(body: ContactLoadedBody) {
    super(body, ContactsLoaded.EVENT_NAME);
  }

}
