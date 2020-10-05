import {LocalPeerStarted} from '../api/LocalPeerStarted';
import {LocalPeer} from './LocalPeer';
import {EventProcessor} from '../../fwk/model/EventProcessor';

export interface ApplyLocalPeerStarted extends EventProcessor<Readonly<LocalPeer>, LocalPeerStarted> {
}
