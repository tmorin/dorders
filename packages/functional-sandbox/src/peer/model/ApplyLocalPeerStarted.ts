import {LocalPeerStarted} from '../api/LocalPeerStarted';
import {LocalPeerState} from './LocalPeerState';
import {EventProcessor} from '../../fwk/model/EventProcessor';

export interface ApplyLocalPeerStarted extends EventProcessor<Readonly<LocalPeerState>, LocalPeerStarted> {
}
