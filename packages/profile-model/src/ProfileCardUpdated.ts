import {Event} from '@dorders/fwk-model-core';
import {ProfileCard, ProfileId} from './Profile';

export type ProfileCardUpdatedBody = {
  profileId: ProfileId
  profileCard: ProfileCard
}

/**
 * A profile card has been updated.
 */
export class ProfileCardUpdated extends Event<ProfileCardUpdatedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ProfileCardUpdated.name}`);

  constructor(body: ProfileCardUpdatedBody) {
    super(body, ProfileCardUpdated.EVENT_NAME);
  }
}
