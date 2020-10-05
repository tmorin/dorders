import {EventProcessor} from '../../fwk/model/EventProcessor';
import {Profile} from './Profile';
import {ProfileCardUpdated} from '../api/ProfileCardUpdated';

export interface ApplyProfileCardUpdated extends EventProcessor<Readonly<Profile>, ProfileCardUpdated> {
}
