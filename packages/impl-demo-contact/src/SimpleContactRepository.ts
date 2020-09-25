import {Contact, ContactId, ContactRepository} from '@dorders/model-contact';
import {ProfileId} from '@dorders/model-profile';
import {SimpleContact} from './SimpleContact';
import {SerializedContactRepository} from './SerializedContactRepository';

export class SimpleContactRepository implements ContactRepository {

  public constructor(
    private readonly serializedContactRepository: SerializedContactRepository,
    private readonly cache: Map<ProfileId, Map<ContactId, SimpleContact>> = new Map()
  ) {
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

  async clear(profileId: ProfileId): Promise<void> {
    if (this.cache.has(profileId)) {
      for (const contact of this.cache.get(profileId).values()) {
        await this.delete(contact);
      }
      this.cache.delete(profileId);
    }
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
    const createdContacts: Array<Contact> = [];
    const deletedContacts: Array<Contact> = [];

    const newContacts = await this.serializedContactRepository.list(profileId);
    const newContactIds = newContacts.map(contact => contact.contactId);

    for (const contact of this.cache.get(profileId).values()) {
      if (newContactIds.indexOf(contact.contactId) < 0) {
        await contact.dispose();
        deletedContacts.push(contact);
        this.cache.get(profileId).delete(contact.contactId)
      } else {
        this.setToCache(contact);
        createdContacts.push(contact);
      }
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
    if (this.cache.has(profileId) && this.cache.get(profileId).has(contactId)) {
      this.cache.get(profileId).delete(contactId);
    }
  }

  private setToCache(contact: SimpleContact): SimpleContact {
    if (!this.cache.has(contact.profileId)) {
      this.cache.set(contact.profileId, new Map());
    }
    if (!this.cache.get(contact.profileId).has(contact.contactId)) {
      this.cache.get(contact.profileId).set(contact.contactId, contact);
    }
    return this.cache.get(contact.profileId).get(contact.contactId);
  }

}
