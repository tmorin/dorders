import {EitherAsync} from 'purify-ts';
import {LocalPeer} from '../model/LocalPeer';
import {GetLocalPeer} from '../model/GetLocalPeer';
import {PersistLocalPeer} from '../model/PersistLocalPeer';

export function makeGetLocalPeer(rootLocalPeer: LocalPeer): GetLocalPeer {
  return () => EitherAsync(async () => Object.freeze({...rootLocalPeer}))
}

export function makePersistLocalPeer(rootLocalPeer: LocalPeer): PersistLocalPeer {
  return (localPeer) => EitherAsync(async () => {
    Object.assign(rootLocalPeer, localPeer);
  });
}
