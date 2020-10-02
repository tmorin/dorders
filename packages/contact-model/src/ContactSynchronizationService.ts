import {ContactId} from './Contact';
import {ProfileId} from '@dorders/profile-model';

export const ContactSynchronizationServiceSymbol = Symbol.for('ContactSynchronizationService');

/**
 * The service deals with the ongoing synchronisation of contacts' data.
 */
export interface ContactSynchronizationService {

  /**
   * Monitor the ongoing synchronisation of a contact.
   * The process publishes the event ContactSynchronized each time data is synchronized.
   * @param profileId the identifier of the profile
   * @param contactId the identifier of the contact
   */
  monitor(profileId: ProfileId, contactId: ContactId): Promise<void>

  /**
   * Check the current ongoing synchronizations created potential missing and deleted potential orphan ones.
   * The process may publish the events ContactCreated and ContactDeleted.
   * @param profileId the identifier of a contact
   */
  check(profileId: ProfileId): Promise<void>

}
