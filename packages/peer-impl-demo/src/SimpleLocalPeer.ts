import * as uuid from 'uuid';
import {LocalPeer, LocalPeerStarted, LocalPeerStopped, PeerId} from '@dorders/peer-model';
import {Logger, LoggerFactory} from '@tmorin/ddd-fwk-model-core';

export class SimpleLocalPeer implements LocalPeer {

  private readonly logger: Logger = this.loggerFactory.create(`peer/${SimpleLocalPeer.name}`);

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
