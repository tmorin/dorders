import {LocalPeerState} from './LocalPeerState';
import {EventProcessor} from '../../fwk/model/EventProcessor';
import {LocalPeerStopped} from '../api/LocalPeerStopped';

export interface ApplyLocalPeerStopped extends EventProcessor<Readonly<LocalPeerState>, LocalPeerStopped> {
}
