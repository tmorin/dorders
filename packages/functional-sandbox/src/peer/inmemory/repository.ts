import {EitherAsync} from 'purify-ts';
import {LocalPeerState} from '../model/LocalPeerState';
import {GetLocalPeerState} from '../model/GetLocalPeerState';
import {PersistLocalPeerState} from '../model/PersistLocalPeerState';

export function makeGetLocalPeer(rootLocalPeer: LocalPeerState): GetLocalPeerState {
  return () => EitherAsync(async () => Object.freeze({...rootLocalPeer}))
}

export function makePersistLocalPeer(rootLocalPeer: LocalPeerState): PersistLocalPeerState {
  return (localPeer) => EitherAsync(async () => {
    Object.assign(rootLocalPeer, localPeer);
  });
}
