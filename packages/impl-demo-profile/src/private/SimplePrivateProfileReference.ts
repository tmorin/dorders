import {PrivateProfileReference, ProfileId, SerializedPrivateProfileReference} from '@dorders/model-profile';

export class SimplePrivateProfileReference implements PrivateProfileReference {

  constructor(
    public readonly repositoryId: string,
    public readonly profileId: ProfileId,
  ) {
  }

  async serialize(): Promise<SerializedPrivateProfileReference> {
    return JSON.stringify({
      repositoryId: this.repositoryId,
      profileId: this.profileId
    });
  }

}
