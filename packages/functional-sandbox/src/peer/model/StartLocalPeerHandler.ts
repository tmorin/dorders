import {GetLocalPeer} from './GetLocalPeer';
import {ApplyLocalPeerStarted} from './ApplyLocalPeerStarted';
import {StartLocalPeer} from '../api/StartLocalPeer';
import {defaultProcessStartLocalPeer, ProcessStartLocalPeer} from './ProcessStartLocalPeer';
import {PersistLocalPeer} from './PersistLocalPeer';
import {EitherAsync, Tuple} from 'purify-ts';
import {CommandHandler} from '../../fwk/model/CommandHandler';
import {StartLocalPeerResult} from '../api/StartLocalPeerResult';

export interface StartLocalPeeHandler extends CommandHandler<StartLocalPeer, StartLocalPeerResult> {
}

export type MakeHandleStartLocalPeerOptions = {
  getLocalPeer: GetLocalPeer
  persistLocalPeer: PersistLocalPeer
  applyLocalPeerStarted: ApplyLocalPeerStarted
}

export function makeHandleStartLocalPeer(options: MakeHandleStartLocalPeerOptions): StartLocalPeeHandler {
  const {applyLocalPeerStarted, getLocalPeer, persistLocalPeer} = options;
  const processStartLocalPeer: ProcessStartLocalPeer = defaultProcessStartLocalPeer;
  return (command: StartLocalPeer) => EitherAsync(async ({fromPromise, liftEither, throwE}) => {
    try {
      const state = await fromPromise(getLocalPeer());
      const [localPeerStarted] = await liftEither(processStartLocalPeer(state, command));
      const newState = await fromPromise(applyLocalPeerStarted(state, localPeerStarted));
      await fromPromise(persistLocalPeer(newState));
      return Tuple.fromArray([new StartLocalPeerResult(), [localPeerStarted]]);
    } catch (e) {
      throwE(e);
    }
  });
}
