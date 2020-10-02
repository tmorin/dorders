import {ProfileMap} from './ProfileMap';
import {ProfileId} from '@dorders/profile-model';

export interface ProfileMaps {
  profileId: ProfileId
  privateMap: ProfileMap
  publicMap: ProfileMap
}
