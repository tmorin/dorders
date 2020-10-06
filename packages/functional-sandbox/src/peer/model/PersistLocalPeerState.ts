import {LocalPeerState} from './LocalPeerState';
import {EitherAsync} from 'purify-ts';

export interface PersistLocalPeerState {
  (localPeer: Readonly<LocalPeerState>): EitherAsync<Error, void>
}
