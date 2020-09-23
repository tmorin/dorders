import {Event} from '@dorders/framework';
import {ProfileId} from './Profile';

export type ProfileDeletedBody = {
  profileId: ProfileId
}

/**
 * A profile has been deleted.
 */
export class ProfileDeleted extends Event<ProfileDeletedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ProfileDeleted.name}`);

  constructor(body: ProfileDeletedBody) {
    super(body, ProfileDeleted.EVENT_NAME);
  }
}
