import {LocalPeerState} from './LocalPeerState';
import {EitherAsync} from 'purify-ts';

export interface GetLocalPeerState {
  (): EitherAsync<Error, Readonly<LocalPeerState>>
}
