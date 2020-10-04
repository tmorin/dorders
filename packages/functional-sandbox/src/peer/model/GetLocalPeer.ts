import {LocalPeer} from './LocalPeer';
import {EitherAsync} from 'purify-ts';

export interface GetLocalPeer {
  (): EitherAsync<Error, Readonly<LocalPeer>>
}
