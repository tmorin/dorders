import {EitherAsync} from 'purify-ts';
import {LocalPeerStatus} from '../model/LocalPeerState';
import {ApplyLocalPeerStopped} from '../model/ApplyLocalPeerStopped';

export function makeApplyLocalPeerStopped(): ApplyLocalPeerStopped {
  return (state) => EitherAsync(async () => Object.freeze({...state, status: LocalPeerStatus.stopped}))
}
