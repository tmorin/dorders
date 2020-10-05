import {EitherAsync} from 'purify-ts';
import {LocalPeerStatus} from '../model/LocalPeer';
import {ApplyLocalPeerStarted} from '../model/ApplyLocalPeerStarted';

export function makeApplyLocalPeerStarted(): ApplyLocalPeerStarted {
  return (state) => EitherAsync(async () => Object.freeze({...state, status: LocalPeerStatus.started}))
}
