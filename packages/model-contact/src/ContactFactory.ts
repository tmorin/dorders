import {ProfileId, PublicProfileReference} from '@dorders/model-profile';
import {Contact} from './Contact';

export const ContactFactorySymbol = Symbol.for('ContactFactory');

/**
 * Factory of contacts.
 */
export interface ContactFactory {

  /**
   * Create a contact from public profile reference.
   * @param profileId the identifier of the profile which hosts the contact
   * @param publicProfileReference the reference of the public profile
   */
  createFromReference(profileId: ProfileId, publicProfileReference: PublicProfileReference): Promise<Contact>

}
