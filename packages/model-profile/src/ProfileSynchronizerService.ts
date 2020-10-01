import {ProfileId} from './Profile';

export const ProfileSynchronizerServiceSymbol = Symbol.for('ProfileSynchronizerService');

export interface ProfileSynchronizerService {

  /**
   * Start the ongoing synchronization or its monitoring to publish ProfileSynchronized accordingly.
   * @param profileId the identifier profile
   */
  startOngoingSynchronization(profileId: ProfileId): Promise<void>

}
