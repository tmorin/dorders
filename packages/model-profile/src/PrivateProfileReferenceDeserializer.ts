import {PrivateProfileReference, SerializedPrivateProfileReference} from './PrivateProfile';

export const PrivateProfileReferenceDeserializerSymbol = Symbol.for('PrivateProfileReferenceDeserializer');

/**
 * Service providing services to deserialize reference of private profiles.
 */
export interface PrivateProfileReferenceDeserializer {

  /**
   * Create an object form of the reference of a private profile.
   * @param serializedPrivateProfileReference the serialized form
   */
  deserialize(serializedPrivateProfileReference: SerializedPrivateProfileReference): Promise<PrivateProfileReference>

}
