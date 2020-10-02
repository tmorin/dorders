import {PrivateProfile, PrivateProfileReference} from './PrivateProfile';

export const PrivateProfileFactorySymbol = Symbol.for('PrivateProfileFactory');

/**
 * Factory of private profiles.
 */
export interface PrivateProfileFactory {

  /**
   * Create locally a profile from scratch.
   */
  createFromScratch(): Promise<PrivateProfile>

  /**
   * Create locally a profile hosted in another peer.
   * @param privateProfileReference the reference of the private profile
   */
  createFromReference(privateProfileReference: PrivateProfileReference): Promise<PrivateProfile>

}
