import {LocalPeerStopped} from '../api/LocalPeerStopped';
import {LocalPeerState, LocalPeerStatus} from './LocalPeerState';
import {StopLocalPeer} from '../api/StopLocalPeer';
import {Either, Maybe} from 'purify-ts';

export type StopLocalPeerEvents = [LocalPeerStopped];

export interface ProcessStopLocalPeer {
  (state: LocalPeerState, command: StopLocalPeer): Either<Error, StopLocalPeerEvents>
}

export function localPeerCanBeStoppedFrom(status: LocalPeerStatus): boolean {
  switch (status) {
    case LocalPeerStatus.started:
      return true;
    default:
      return false;
  }
}

export function defaultProcessStopLocalPeer(state: Readonly<LocalPeerState>): Either<Error, StopLocalPeerEvents> {
  return Maybe.of(state)
    .map(state => state.status)
    .filter(localPeerCanBeStoppedFrom)
    .map<StopLocalPeerEvents>(() => [new LocalPeerStopped(state.peerId)])
    .toEither(new Error('local peer already stopped'));
}
