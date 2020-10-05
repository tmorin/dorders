import {EitherAsync} from 'purify-ts';
import {Profile} from './Profile';

export interface PersistProfile {
  (profile: Readonly<Profile>): EitherAsync<Error, void>
}
