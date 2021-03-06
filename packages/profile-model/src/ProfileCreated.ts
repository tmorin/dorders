import {Event} from '@tmorin/ddd-fwk-model-core';
import {ProfileId} from './Profile';

export type ProfileCreatedBody = {
  profileId: ProfileId
}

/**
 * A profile has been created.
 */
export class ProfileCreated extends Event<ProfileCreatedBody> {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ProfileCreated.name}`);


  constructor(body: ProfileCreatedBody) {
    super(body, ProfileCreated.EVENT_NAME);
  }
}
