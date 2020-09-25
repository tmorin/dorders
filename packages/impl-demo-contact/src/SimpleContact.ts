import {Contact, ContactCreated, ContactDeleted, ContactId, ContactRenamed} from '@dorders/model-contact';
import {ProfileId} from '@dorders/model-profile';
import {SimplePublicProfile} from '@dorders/impl-demo-profile';

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

  async applyContactDeleted(contactDeleted: ContactDeleted): Promise<void> {
  }

  async dispose() {
    this.publicProfile.map.removeObservers();
  }
}
