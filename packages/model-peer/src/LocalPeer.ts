import {Peer} from './Peer';
import {LocalPeerStarted} from './LocalPeerStarted';
import {LocalPeerStopped} from './LocalPeerStopped';

/**
 * A local peer.
 */
export interface LocalPeer extends Peer {

  /**
   * Mutate the state of the contact according to the event.
   * @param peerStarted the event
   */
  applyPeerStarted(peerStarted: LocalPeerStarted): Promise<void>

  /**
   * Mutate the state of the contact according to the event.
   * @param peerStopped the event
   */
  applyPeerStopped(peerStopped: LocalPeerStopped): Promise<void>

}
