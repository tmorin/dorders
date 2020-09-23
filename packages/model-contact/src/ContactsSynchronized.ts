import {ProfileId} from '@dorders/model-profile';
import {Event} from '@dorders/framework';

export type ContactsSynchronizedBody = {
  profileId: ProfileId
}

/**
 * The contacts of a profile have been synchronized.
 */
export class ContactsSynchronized extends Event<ContactsSynchronizedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ContactsSynchronized.name}`);

  constructor(body: ContactsSynchronizedBody) {
    super(body, ContactsSynchronized.EVENT_NAME);
  }

}
