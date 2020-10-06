import {StartLocalPeer} from '../api/StartLocalPeer';
import {LocalPeerStarted} from '../api/LocalPeerStarted';
import {LocalPeerState, LocalPeerStatus} from './LocalPeerState';
import {Either, Maybe} from 'purify-ts';

export type StartLocalPeerEvents = [LocalPeerStarted];

export interface ProcessStartLocalPeer {
  (state: LocalPeerState, command: StartLocalPeer): Either<Error, StartLocalPeerEvents>
}

export function localPeerCanBeStartedFrom(status: LocalPeerStatus): boolean {
  switch (status) {
    case LocalPeerStatus.stopped:
      return true;
    default:
      return false;
  }
}

export function defaultProcessStartLocalPeer(state: Readonly<LocalPeerState>): Either<Error, StartLocalPeerEvents> {
  return Maybe.of(state)
    .map(state => state.status)
    .filter(localPeerCanBeStartedFrom)
    .map<StartLocalPeerEvents>(() => [new LocalPeerStarted(state.peerId)])
    .toEither(new Error('local peer already started'));
}
