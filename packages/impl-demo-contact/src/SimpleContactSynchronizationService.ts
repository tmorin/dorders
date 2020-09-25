import {
  ContactCreated,
  ContactDeleted,
  ContactId,
  ContactsSynchronized,
  ContactSynchronizationService,
  ContactSynchronized
} from '@dorders/model-contact';
import {ProfileId} from '@dorders/model-profile';
import {SimpleContact} from './SimpleContact';
import {MessageBus} from '@dorders/framework';
import {SimpleContactRepository} from './SimpleContactRepository';

export class SimpleContactSynchronizationService implements ContactSynchronizationService {

  constructor(
    private readonly bus: MessageBus,
    private readonly contactRepository: SimpleContactRepository,
  ) {
  }

  async monitor(profileId: ProfileId, contactId: ContactId): Promise<void> {
    const contact = await this.contactRepository.get(profileId, contactId);
    const simpleContact = SimpleContact.from(contact);
    simpleContact.publicProfile.map.addObserver(async (newProfileMap) => {
      simpleContact.publicProfile.map.replaceBy(newProfileMap);
      const contactSynchronized = new ContactSynchronized({profileId, contactId})
      await this.bus.publish(contactSynchronized);
    });
  }

  async check(profileId: ProfileId): Promise<void> {
    const {createdContacts, deletedContacts} = await this.contactRepository.checkCache(profileId);

    for (const createdContact of createdContacts) {
      const contactCreated = new ContactCreated({
        profileId, contactId: createdContact.contactId
      })
      await createdContact.applyContactCreated(contactCreated);
      await this.bus.publish<ContactCreated>(contactCreated);
    }

    for (const deletedContact of deletedContacts) {
      const contactDeleted = new ContactDeleted({
        profileId, contactId: deletedContact.contactId
      })
      await deletedContact.applyContactDeleted(contactDeleted);
      await this.bus.publish<ContactDeleted>(contactDeleted);
    }

    const contactSynchronized = new ContactsSynchronized({profileId})
    await this.bus.publish(contactSynchronized);
  }

}
