import {
  ContactCreated,
  ContactDeleted,
  ContactId,
  ContactSynchronizationService,
  ContactSynchronized
} from '@dorders/model-contact';
import {ProfileId} from '@dorders/model-profile';
import {SimpleContact} from './SimpleContact';
import {Logger, LoggerFactory, MessageBus} from '@dorders/framework';
import {SimpleContactRepository} from './SimpleContactRepository';

export class SimpleContactSynchronizationService implements ContactSynchronizationService {

  private readonly logger: Logger;

  constructor(
    private readonly bus: MessageBus,
    private readonly contactRepository: SimpleContactRepository,
    private readonly loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.create(SimpleContactSynchronizationService.name)
  }

  async monitor(profileId: ProfileId, contactId: ContactId): Promise<void> {
    const contact = await this.contactRepository.get(profileId, contactId);
    const simpleContact = SimpleContact.from(contact);
    this.logger.debug('monitor (%s/%s)', profileId, contactId);
    simpleContact.publicProfile.map.addObserver(async (newProfileMap) => {
      this.logger.debug('public map mutated (%s/%s)', profileId, contactId);
      simpleContact.publicProfile.map.replaceBy(newProfileMap);
      const contactSynchronized = new ContactSynchronized({profileId, contactId})
      await this.bus.publish(contactSynchronized);
    });
  }

  async check(profileId: ProfileId): Promise<void> {
    const {createdContacts, deletedContacts} = await this.contactRepository.checkCache(profileId);
    this.logger.log("createdContacts: %s - deletedContacts: %s", createdContacts.length, deletedContacts.length);

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
  }

}
