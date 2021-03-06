import {Event} from '@tmorin/ddd-fwk-model-core';

/**
 * Profiles have been loaded.
 */
export class ProfilesLoaded extends Event {
  public static readonly EVENT_NAME = Symbol.for(`profile/${ProfilesLoaded.name}`);

  constructor() {
    super(undefined, ProfilesLoaded.EVENT_NAME);
  }
}
