import * as uuid from 'uuid';
import {LocalPeer, LocalPeerStarted, LocalPeerStopped, PeerId} from '@dorders/model-peer';
import {Logger, LoggerFactory} from '@dorders/framework';

export class InMemoryLocalPeer implements LocalPeer {

  private readonly logger: Logger = this.loggerFactory.create(`profile/${InMemoryLocalPeer.name}`);

  constructor(
    private readonly loggerFactory: LoggerFactory,
    readonly peerId: PeerId = uuid.v4()
  ) {
  }

  async applyPeerStarted(peerStarted: LocalPeerStarted): Promise<void> {
    this.logger.info('peer started')
  }

  async applyPeerStopped(peerStopped: LocalPeerStopped): Promise<void> {
    this.logger.info('peer stopped')
  }

}
