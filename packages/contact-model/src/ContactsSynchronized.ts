import {ProfileId} from '@dorders/profile-model';
import {Event} from '@tmorin/ddd-fwk-model-core';

export type ContactsSynchronizedBody = {
  profileId: ProfileId
}

/**
 * The contacts of a profile have been synchronized.
 */
export class ContactsSynchronized extends Event<ContactsSynchronizedBody> {
  public static readonly EVENT_NAME = Symbol.for(`contact/${ContactsSynchronized.name}`);

  constructor(body: ContactsSynchronizedBody) {
    super(body, ContactsSynchronized.EVENT_NAME);
  }

}
