import {ProfileId} from '@dorders/model-profile';
import {Event} from '@dorders/framework';

export type ContactLoadedBody = {
  profileId: ProfileId
}

/**
 * The contacts of a profile have been loaded.
 */
export class ContactsLoaded extends Event<ContactLoadedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ContactsLoaded.name}`);

  constructor(body: ContactLoadedBody) {
    super(body, ContactsLoaded.EVENT_NAME);
  }

}
