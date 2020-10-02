import {Organization, Person} from 'schema-dts';

/**
 * The identifier of a profile.
 */
export type ProfileId = string;

/**
 * The "visit card" of a profile.
 * The structure relies on the following models:
 * - https://schema.org/Person
 * - https://schema.org/Organization
 */
export type ProfileCard = Person | Organization

/**
 * The serialized value (i.e. string value) of the reference of a profile.
 */
export type SerializedProfileReference = string;

/**
 * A profile reference contains all information required by a peer to import locally a profile hosted in another peer.
 */
export interface ProfileReference<T extends SerializedProfileReference> {

  /**
   * The identifier of a profile.
   */
  readonly profileId: ProfileId;

  /**
   * Return the serialized value of the reference.
   */
  serialize(): Promise<T>

}

/**
 * A profile.
 */
export interface Profile<R extends ProfileReference<any>> {

  /**
   * The identifier of the profile.
   */
  readonly profileId: ProfileId

  /**
   * Return the reference of the profile.
   */
  getReference(): Promise<R>

}
