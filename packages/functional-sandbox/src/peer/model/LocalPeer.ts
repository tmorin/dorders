import {PeerId} from '../api/PeerId';

export enum LocalPeerStatus {
  started = 'started',
  stopped = 'stopped'
}

export interface LocalPeer {
  peerId: PeerId
  status: LocalPeerStatus
}
