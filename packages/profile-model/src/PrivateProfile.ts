import {Profile, ProfileReference} from './Profile';
import {ProfileCardUpdated} from './ProfileCardUpdated';
import {ProfileCreated} from './ProfileCreated';
import {ProfileDeleted} from './ProfileDeleted';
import {PublicProfile} from './PublicProfile';
import {ProfileSynchronized} from './ProfileSynchronized';

/**
 * The serialized value of the reference of a private profile.
 * This value must be sharable in order to import the referenced profile in other peers.
 */
export type SerializedPrivateProfileReference = string;

/**
 * The reference of a private profile.
 */
export interface PrivateProfileReference extends ProfileReference<SerializedPrivateProfileReference> {
}

/**
 * A the private side of a profile.
 */
export interface PrivateProfile extends Profile<PrivateProfileReference> {

  /**
   * The public side of the profile.
   */
  readonly publicProfile: PublicProfile

  // profile

  /**
   * Mutate the state of the entity according to the event.
   * @param profileCreated the event
   */
  applyProfileCreated(profileCreated: ProfileCreated): Promise<void>

  /**
   * Mutate the state of the entity according to the event.
   * @param profileCardUpdated the event
   */
  applyProfileCardUpdated(profileCardUpdated: ProfileCardUpdated): Promise<void>

  /**
   * Mutate the state of the entity according to the event.
   * @param profilesSynchronized the event
   */
  applyProfilesSynchronized(profilesSynchronized: ProfileSynchronized): Promise<void>

  /**
   * Mutate the state of the contact according to the event.
   * @param profileDeleted the event
   */
  applyProfileDeleted(profileDeleted: ProfileDeleted): Promise<void>

}
