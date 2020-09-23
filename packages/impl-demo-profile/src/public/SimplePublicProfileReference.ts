import {ProfileId, PublicProfileReference, SerializedPublicProfileReference} from '@dorders/model-profile';

export class SimplePublicProfileReference implements PublicProfileReference {

  constructor(
    public readonly repositoryId: string,
    public readonly profileId: ProfileId,
    public readonly name: string,
  ) {
  }

  async serialize(): Promise<SerializedPublicProfileReference> {
    return JSON.stringify({
      repositoryId: this.repositoryId,
      profileId: this.profileId,
      name: this.name
    });
  }

}
