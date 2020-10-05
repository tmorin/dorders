import {EventProcessor} from '../../fwk/model/EventProcessor';
import {Profile} from './Profile';
import {ProfileCreated} from '../api/ProfileCreated';

export interface ApplyProfileCreated extends EventProcessor<Readonly<Profile>, ProfileCreated> {
}
