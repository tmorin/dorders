import {PrivateProfile} from './PrivateProfile';

export const ProfileSynchronizerServiceSymbol = Symbol.for('ProfileSynchronizerService');

export interface ProfileSynchronizerService {

  /**
   * Start the ongoing synchronization or its monitoring to publish ProfileSynchronized accordingly.
   * @param profile the profile
   */
  startOngoingSynchronization(profile: PrivateProfile): Promise<void>

}
