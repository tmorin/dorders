import {PrivateProfileReference, ProfileId, SerializedPrivateProfileReference} from '@dorders/profile-model';

export class SimplePrivateProfileReference implements PrivateProfileReference {

  constructor(
    public readonly profileId: ProfileId,
  ) {
  }

  async serialize(): Promise<SerializedPrivateProfileReference> {
    return JSON.stringify({
      profileId: this.profileId
    });
  }

}
