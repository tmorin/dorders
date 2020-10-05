import {Profile} from './Profile';
import {EitherAsync} from 'purify-ts';
import {ProfileId} from '../api/ProfileId';

export interface GetProfile {
  (profileId: ProfileId): EitherAsync<Error, Readonly<Profile>>
}
