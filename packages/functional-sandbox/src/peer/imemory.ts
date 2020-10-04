import {LocalPeer, LocalPeerStatus} from './model/LocalPeer';
import {GetLocalPeer} from './model/GetLocalPeer';
import {PersistLocalPeer} from './model/PersistLocalPeer';
import {ApplyLocalPeerStarted} from './model/ApplyLocalPeerStarted';
import {EitherAsync} from 'purify-ts';

export function makeGetLocalPeer(rootLocalPeer: LocalPeer): GetLocalPeer {
  return () => EitherAsync(async () => Object.freeze({...rootLocalPeer}))
}

export function makePersistLocalPeer(rootLocalPeer: LocalPeer): PersistLocalPeer {
  return (localPeer) => EitherAsync(async () => {
    Object.assign(rootLocalPeer, localPeer);
  });
}

export function makeApplyLocalPeerStarted(): ApplyLocalPeerStarted {
  return (state) => EitherAsync(async () => Object.freeze({...state, status: LocalPeerStatus.started}))
}
