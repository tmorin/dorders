import {LocalPeer, LocalPeerFactory} from '@dorders/peer-model';
import {SimpleLocalPeer} from './SimpleLocalPeer';
import {LoggerFactory} from '@dorders/fwk-model-core';

export class SimpleLocalPeerFactory implements LocalPeerFactory {

  constructor(
    private readonly loggerFactory: LoggerFactory,
    private readonly peer = new SimpleLocalPeer(loggerFactory)
  ) {
  }

  async create(): Promise<LocalPeer> {
    return this.peer;
  }

}
