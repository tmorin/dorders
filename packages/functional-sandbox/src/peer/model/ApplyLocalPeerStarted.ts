import {LocalPeerStarted} from './LocalPeerStarted';
import {LocalPeer} from './LocalPeer';
import {EventProcessor} from '../../fwk/model/EventProcessor';

export interface ApplyLocalPeerStarted extends EventProcessor<Readonly<LocalPeer>, LocalPeerStarted> {
}
