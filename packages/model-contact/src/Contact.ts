import {ProfileId, PublicProfile} from '@dorders/model-profile';
import {ContactRenamed} from './ContactRenamed';
import {ContactCreated} from './ContactCreated';
import {ContactDeleted} from './ContactDeleted'

/**
 * The identifier of the contact.
 */
export type ContactId = ProfileId

/**
 * A contact is record hosted by a profile which reference the public side of another profile.
 */
export interface Contact {

  /**
   * The identifier of the profile which hosts the contact.
   */
  readonly profileId: ProfileId

  /**
   * The identifier of the contact.
   */
  readonly contactId: ContactId

  /**
   * The name of the contact.
   */
  readonly name: string

  /**
   * The public side of the referenced profile.
   */
  readonly publicProfile: PublicProfile

  /**
   * Mutate the state of the contact according to the event.
   * @param contactCreated the event
   */
  applyContactCreated(contactCreated: ContactCreated): Promise<void>

  /**
   * Mutate the state of the contact according to the event.
   * @param contactRenamed the event
   */
  applyContactRenamed(contactRenamed: ContactRenamed): Promise<void>

  /**
   * Mutate the state of the contact according to the event.
   * @param contactDeleted the event
   */
  applyContactDeleted(contactDeleted: ContactDeleted): Promise<void>

}
