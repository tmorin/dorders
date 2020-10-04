import {LocalPeer} from './LocalPeer';
import {EitherAsync} from 'purify-ts';

export interface PersistLocalPeer {
  (localPeer: Readonly<LocalPeer>): EitherAsync<Error, void>
}
