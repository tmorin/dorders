import {
  PrivateProfileReference,
  PrivateProfileReferenceDeserializer,
  SerializedPrivateProfileReference
} from '@dorders/model-profile';
import {SimplePrivateProfileReference} from './SimplePrivateProfileReference';

export class SimplePrivateProfileReferenceDeserializer implements PrivateProfileReferenceDeserializer {

  async deserialize(serializedPrivateProfileReference: SerializedPrivateProfileReference): Promise<PrivateProfileReference> {
    const {profileId} = JSON.parse(serializedPrivateProfileReference);
    return new SimplePrivateProfileReference(profileId);
  }

}
