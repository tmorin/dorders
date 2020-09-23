import {PrivateProfile} from './PrivateProfile';
import {ProfileId} from './Profile';

export const PrivateProfileRepositorySymbol = Symbol.for('PrivateProfileRepository');

/**
 * The repository of hosted profiles, i.e. private profile.
 * There is one repository by peer.
 */
export interface PrivateProfileRepository {

  /**
   * Add a new private profile in the repository.
   * @param privateProfile the private profile
   */
  add(privateProfile: PrivateProfile): Promise<void>

  /**
   * Remove a private profile managed by the repository.
   * @param privateProfile the private profile
   */
  remove(privateProfile: PrivateProfile): Promise<void>

  /**
   * Get a private profile from its identifier.
   * @param profileId the profile identifier
   */
  get(profileId: ProfileId): Promise<PrivateProfile>

  /**
   * List all private profiles managed by the repository.
   */
  list(): Promise<Array<PrivateProfile>>

  /**
   * Return an asynchronous iterable to iterate over private profiles managed by the repository.
   */
  iterate(): AsyncIterable<PrivateProfile>

}
