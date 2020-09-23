import {Contact, ContactId} from './Contact';
import {ProfileId} from '@dorders/model-profile';

/**
 * Used as injection point.
 */
export const ContactRepositorySymbol = Symbol.for('ContactRepository');

/**
 * The repository of contacts.
 * There is one repository by peer.
 */
export interface ContactRepository {

  /**
   * Persist the state of a contact.
   * @param contact the contact
   */
  persist(contact: Contact): Promise<void>

  /**
   * Get a contact from its identifiers.
   * @param profileId the identifier of the profile which host the expected contact
   * @param contactId the identifier of the contact
   */
  get(profileId: ProfileId, contactId: ContactId): Promise<Contact>

  /**
   * Delete a contact.
   * @param contact the contact
   */
  delete(contact: Contact): Promise<void>

  /**
   * Clear all contacts related to the provided profileId.
   * @param profileId the identifier of the profile
   */
  clear(profileId: ProfileId): Promise<void>

  /**
   * Return an asynchronous iterable to iterate over contacts of hosted profile.
   * @param profileId the identifier of the profile
   */
  iterate(profileId: ProfileId): AsyncIterable<Contact>

}
