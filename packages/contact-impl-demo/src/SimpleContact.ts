import {
  Contact,
  ContactCreated,
  ContactDeleted,
  ContactId,
  ContactRenamed,
  ContactSynchronized
} from '@dorders/contact-model';
import {ProfileId} from '@dorders/profile-model';
import {SimplePublicProfile} from '@dorders/profile-impl-demo';

export class SimpleContact implements Contact {

  constructor(
    public readonly profileId: ProfileId,
    public readonly contactId: ContactId,
    public name: string,
    public readonly publicProfile: SimplePublicProfile
  ) {
  }

  static from(contact: Contact): SimpleContact {
    if (contact instanceof SimpleContact) {
      return contact;
    }
    throw new Error(`Contact (${contact}) is not a SimpleContact`);
  }

  async applyContactCreated(contactCreated: ContactCreated): Promise<void> {
  }

  async applyContactRenamed(contactRenamed: ContactRenamed): Promise<void> {
    this.name = contactRenamed.body.newName;
  }

  async applyContactSynchronized(contactSynchronized: ContactSynchronized): Promise<void> {
  }

  async applyContactDeleted(contactDeleted: ContactDeleted): Promise<void> {
  }

  async dispose() {
    this.publicProfile.map.removeObservers();
  }
}
