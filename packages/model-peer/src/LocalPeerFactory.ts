import {LocalPeer} from './LocalPeer';

/**
 * Used as injection point.
 */
export const LocalPeerFactorySymbol = Symbol.for('LocalPeerFactory');

/**
 * factory of local peer.
 */
export interface LocalPeerFactory {

  /**
   * Return the local peer.
   */
  create(): Promise<LocalPeer>

}
