import {ProfileId} from '@dorders/model-profile';
import {ContactId} from './Contact';
import {Event} from '@dorders/fwk-model-core';

export type ContactSynchronizedBody = {
  profileId: ProfileId
  contactId: ContactId
}

/**
 * A contact has been synchronized.
 */
export class ContactSynchronized extends Event<ContactSynchronizedBody> {
  public static readonly EVENT_NAME = Symbol.for(`contact/${ContactSynchronized.name}`);

  constructor(body: ContactSynchronizedBody) {
    super(body, ContactSynchronized.EVENT_NAME);
  }

}
