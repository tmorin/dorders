import {GetLocalPeerState} from './GetLocalPeerState';
import {ApplyLocalPeerStarted} from './ApplyLocalPeerStarted';
import {StartLocalPeer} from '../api/StartLocalPeer';
import {defaultProcessStartLocalPeer, ProcessStartLocalPeer} from './ProcessStartLocalPeer';
import {PersistLocalPeerState} from './PersistLocalPeerState';
import {EitherAsync, Tuple} from 'purify-ts';
import {CommandHandler} from '../../fwk/model/CommandHandler';
import {StartLocalPeerResult} from '../api/StartLocalPeerResult';

export interface StartLocalPeeHandler extends CommandHandler<StartLocalPeer, StartLocalPeerResult> {
}

export type MakeHandleStartLocalPeerOptions = {
  getLocalPeerState: GetLocalPeerState
  persistLocalPeerState: PersistLocalPeerState
  applyLocalPeerStarted: ApplyLocalPeerStarted
}

export function makeHandleStartLocalPeer(options: MakeHandleStartLocalPeerOptions): StartLocalPeeHandler {
  const {applyLocalPeerStarted, getLocalPeerState, persistLocalPeerState} = options;
  const processStartLocalPeer: ProcessStartLocalPeer = defaultProcessStartLocalPeer;
  return (command: StartLocalPeer) => EitherAsync(async ({fromPromise, liftEither, throwE}) => {
    try {
      const state = await fromPromise(getLocalPeerState());
      const [localPeerStarted] = await liftEither(processStartLocalPeer(state, command));
      const newState = await fromPromise(applyLocalPeerStarted(state, localPeerStarted));
      await fromPromise(persistLocalPeerState(newState));
      return Tuple.fromArray([new StartLocalPeerResult(command.peerId), [localPeerStarted]]);
    } catch (e) {
      throwE(e);
    }
  });
}
