import {GetLocalPeer} from './GetLocalPeer';
import {StopLocalPeer} from '../api/StopLocalPeer';
import {defaultProcessStopLocalPeer, ProcessStopLocalPeer} from './ProcessStopLocalPeer';
import {PersistLocalPeer} from './PersistLocalPeer';
import {EitherAsync, Tuple} from 'purify-ts';
import {CommandHandler} from '../../fwk/model/CommandHandler';
import {StopLocalPeerResult} from '../api/StopLocalPeerResult';
import {ApplyLocalPeerStopped} from './ApplyLocalPeerStopped';

export interface StopLocalPeeHandler extends CommandHandler<StopLocalPeer, StopLocalPeerResult> {
}

export type MakeHandleStopLocalPeerOptions = {
  getLocalPeer: GetLocalPeer
  persistLocalPeer: PersistLocalPeer
  applyLocalPeerStopped: ApplyLocalPeerStopped
}

export function makeHandleStopLocalPeer(options: MakeHandleStopLocalPeerOptions): StopLocalPeeHandler {
  const {applyLocalPeerStopped, getLocalPeer, persistLocalPeer} = options;
  const processStopLocalPeer: ProcessStopLocalPeer = defaultProcessStopLocalPeer;
  return (command: StopLocalPeer) => EitherAsync(async ({fromPromise, liftEither, throwE}) => {
    try {
      const state = await fromPromise(getLocalPeer());
      const [localPeerStopped] = await liftEither(processStopLocalPeer(state, command));
      const newState = await fromPromise(applyLocalPeerStopped(state, localPeerStopped));
      await fromPromise(persistLocalPeer(newState));
      return Tuple.fromArray([new StopLocalPeerResult(), [localPeerStopped]]);
    } catch (e) {
      throwE(e);
    }
  });
}
