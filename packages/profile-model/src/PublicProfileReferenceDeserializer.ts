import {PublicProfileReference, SerializedPublicProfileReference} from './PublicProfile';

export const PublicProfileReferenceDeserializerSymbol = Symbol.for('PublicProfileReferenceDeserializer');

/**
 * Service providing services to deserialize reference of public profiles.
 */
export interface PublicProfileReferenceDeserializer {

  /**
   * Create an object form of the reference of a public profile.
   * @param serializedPublicProfileReference the serialized form
   */
  deserialize(serializedPublicProfileReference: SerializedPublicProfileReference): Promise<PublicProfileReference>

}
