import {ProfileMap} from './ProfileMap';
import {ProfileId} from '@dorders/model-profile';

export interface ProfileMaps {
  profileId: ProfileId
  privateMap: ProfileMap
  publicMap: ProfileMap
}
