import {ProfileId, PublicProfileReference, SerializedPublicProfileReference} from '@dorders/profile-model';

export class SimplePublicProfileReference implements PublicProfileReference {

  constructor(
    public readonly profileId: ProfileId,
    public readonly name: string,
  ) {
  }

  async serialize(): Promise<SerializedPublicProfileReference> {
    return JSON.stringify({
      profileId: this.profileId,
      name: this.name
    });
  }

}
