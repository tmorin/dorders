import {Profile, ProfileCard, ProfileReference} from './Profile';

/**
 * The serialized value of the reference of a public profile.
 * This value must be sharable in order to import the referenced public profile as contacts.
 */
export type SerializedPublicProfileReference = string;

/**
 * The reference of a public profile.
 */
export interface PublicProfileReference extends ProfileReference<SerializedPublicProfileReference> {
  /**
   * The name of the profile.
   */
  readonly name: string
}

/**
 * A the public side of a profile.
 */
export interface PublicProfile extends Profile<PublicProfileReference> {

  /**
   * The "visited card" of the profile.
   */
  readonly card: ProfileCard

}
