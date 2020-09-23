import {Event} from '@dorders/framework';
import {ProfileId} from './Profile';

export type ProfilesSynchronizedBody = {
  profileId: ProfileId
}

/**
 * Profiles have been synchronized.
 */
export class ProfileSynchronized extends Event<ProfilesSynchronizedBody> {
  public static readonly EVENT_NAME = Symbol.for(`peer/${ProfileSynchronized.name}`);

  constructor(body: ProfilesSynchronizedBody) {
    super(body, ProfileSynchronized.EVENT_NAME);
  }
}
