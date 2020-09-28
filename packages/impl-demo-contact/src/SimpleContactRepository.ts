import {Contact, ContactId, ContactRepository} from '@dorders/model-contact';
import {ProfileId} from '@dorders/model-profile';
import {SimpleContact} from './SimpleContact';
import {SerializedContactRepository} from './SerializedContactRepository';
import {Logger, LoggerFactory} from '@dorders/framework';

export class SimpleContactRepository implements ContactRepository {

  private readonly logger: Logger;

  public constructor(
    private readonly serializedContactRepository: SerializedContactRepository,
    private readonly loggerFactory: LoggerFactory,
    public readonly cache: Map<ProfileId, Map<ContactId, SimpleContact>> = new Map()
  ) {
    this.logger = loggerFactory.create(SimpleContactRepository.name);
  }

  async persist(contact: Contact): Promise<void> {
    const simpleContact = SimpleContact.from(contact);
    await this.serializedContactRepository.persist(simpleContact);
    this.setToCache(simpleContact);
  }

  async get(profileId: ProfileId, contactId: ContactId): Promise<Contact> {
    return this.getFromCache(profileId, contactId);
  }

  async delete({profileId, contactId}: Contact): Promise<void> {
    const simpleContact = this.getFromCache(profileId, contactId);
    await simpleContact.dispose();
    await this.serializedContactRepository.delete(simpleContact);
    this.deleteFromCache(profileId, contactId);
  }

  async clear(profileId: ProfileId): Promise<Array<Contact>> {
    const contacts: Array<Contact> = [];
    if (this.cache.has(profileId)) {
      for (const contact of this.cache.get(profileId).values()) {
        const simpleContact = this.getFromCache(profileId, contact.contactId);
        await simpleContact.dispose();
        this.deleteFromCache(profileId, contact.contactId);
        contacts.push(contact);
      }
      this.cache.delete(profileId);
    }
    return contacts;
  }

  iterate(profileId: ProfileId): AsyncIterable<Contact> {
    return {
      [Symbol.asyncIterator]: () => {
        const pContacts = this.serializedContactRepository.list(profileId);
        let index = 0;
        return {
          next: async () => {
            const contacts = await pContacts;
            if (index >= contacts.length) {
              return {done: true, value: null};
            }
            const value = this.setToCache(contacts[index++]);
            return {done: false, value};
          }
        };
      }
    }
  }

  async checkCache(profileId: ProfileId): Promise<{
    createdContacts: Array<Contact>,
    deletedContacts: Array<Contact>,
  }> {
    if (!this.cache.has(profileId)) {
      this.logger.debug('create cache for profile');
      this.cache.set(profileId, new Map());
    }

    const cachedContactIds: Array<ContactId> = Array.from(this.cache.get(profileId).keys());
    this.logger.debug('cachedContactIds', cachedContactIds);

    const newContacts = await this.serializedContactRepository.list(profileId);
    const newContactIds = newContacts.map(contact => contact.contactId);
    this.logger.debug('newContactIds', newContactIds);

    const deletedContacts: Array<SimpleContact> = cachedContactIds
      .filter((cachedContactId) => newContactIds.indexOf(cachedContactId) < 0)
      .map((cachedContactId) => this.cache.get(profileId).get(cachedContactId));

    for (const deletedContact of deletedContacts) {
      this.logger.debug('delete contact', deletedContact.contactId);
      await deletedContact.dispose();
      this.cache.get(profileId).delete(deletedContact.contactId)
    }

    const createdContacts: Array<SimpleContact> = newContacts
      .filter(newContact => !this.hasInCache(newContact.profileId, newContact.contactId));

    for (const createdContact of createdContacts) {
      this.logger.debug('create contact', createdContact.contactId);
      this.setToCache(createdContact);
    }

    return {createdContacts, deletedContacts};
  }

  async dispose() {
    for (const contacts of this.cache.values()) {
      for (const contact of contacts.values()) {
        await contact.dispose();
        this.cache.get(contact.profileId).delete(contact.contactId);
      }
    }
    this.cache.clear();
  }

  private getFromCache(profileId: ProfileId, contactId: ContactId): SimpleContact {
    if (this.cache.has(profileId) && this.cache.get(profileId).has(contactId)) {
      return this.cache.get(profileId).get(contactId);
    }
    throw new Error(`Contact (${profileId}/${contactId}) not found`);
  }

  private deleteFromCache(profileId: ProfileId, contactId: ContactId) {
    if (this.hasInCache(profileId, contactId)) {
      this.cache.get(profileId).delete(contactId);
    }
  }

  private setToCache(contact: SimpleContact): SimpleContact {
    if (!this.cache.has(contact.profileId)) {
      this.cache.set(contact.profileId, new Map());
    }
    if (!this.hasInCache(contact.profileId, contact.contactId)) {
      this.cache.get(contact.profileId).set(contact.contactId, contact);
    }
    return this.cache.get(contact.profileId).get(contact.contactId);
  }

  private hasInCache(profileId: ProfileId, contactId: ContactId): boolean {
    return this.cache.get(profileId) && this.cache.get(profileId).has(contactId);
  }
}
