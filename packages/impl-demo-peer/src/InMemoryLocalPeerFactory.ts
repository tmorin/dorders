import {LocalPeer, LocalPeerFactory} from '@dorders/model-peer';
import {InMemoryLocalPeer} from './InMemoryLocalPeer';
import {LoggerFactory} from '@dorders/framework';

export class InMemoryLocalPeerFactory implements LocalPeerFactory {

  constructor(
    private readonly loggerFactory: LoggerFactory,
    private readonly peer = new InMemoryLocalPeer(loggerFactory)
  ) {
  }

  async create(): Promise<LocalPeer> {
    return this.peer;
  }

}
