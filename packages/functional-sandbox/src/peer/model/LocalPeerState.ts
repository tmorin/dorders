import {PeerId} from '../api/PeerId';

export enum LocalPeerStatus {
  started = 'started',
  stopped = 'stopped'
}

export interface LocalPeerState {
  peerId: PeerId
  status: LocalPeerStatus
}
