export type PeerId = string;

export enum LocalPeerStatus {
  starting = 'starting',
  started = 'started',
  stopping = 'stopping',
  stopped = 'stopped'
}

export interface LocalPeer {
  peerId: PeerId
  status: LocalPeerStatus
}
