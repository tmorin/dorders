import {LocalPeer, LocalPeerFactory} from '@dorders/model-peer';
import {SimpleLocalPeer} from './SimpleLocalPeer';
import {LoggerFactory} from '@dorders/framework';

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
