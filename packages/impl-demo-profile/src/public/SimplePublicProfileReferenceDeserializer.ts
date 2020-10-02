import {
  PublicProfileReference,
  PublicProfileReferenceDeserializer,
  SerializedPublicProfileReference
} from '@dorders/profile-model';
import {SimplePublicProfileReference} from './SimplePublicProfileReference';

export class SimplePublicProfileReferenceDeserializer implements PublicProfileReferenceDeserializer {

  async deserialize(serializedPublicProfileReference: SerializedPublicProfileReference): Promise<PublicProfileReference> {
    const {profileId, name} = JSON.parse(serializedPublicProfileReference);
    return new SimplePublicProfileReference(profileId, name);
  }

}
