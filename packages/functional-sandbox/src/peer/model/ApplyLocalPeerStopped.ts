import {LocalPeer} from './LocalPeer';
import {EventProcessor} from '../../fwk/model/EventProcessor';
import {LocalPeerStopped} from '../api/LocalPeerStopped';

export interface ApplyLocalPeerStopped extends EventProcessor<Readonly<LocalPeer>, LocalPeerStopped> {
}
