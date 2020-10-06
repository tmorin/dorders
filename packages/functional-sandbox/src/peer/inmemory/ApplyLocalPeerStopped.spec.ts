import {makeGetLocalPeer, makePersistLocalPeer} from './repository';
import {LocalPeerState, LocalPeerStatus} from '../model/LocalPeerState';
import {makeApplyLocalPeerStopped} from './ApplyLocalPeerStopped';
import {makeHandleStopLocalPeer} from '../model/StopLocalPeerHandler';
import {StopLocalPeer} from '../api/StopLocalPeer';

describe('ApplyLocalPeerStopped', function () {

  it('should succeed', async function () {
    const rootLocalPeer: LocalPeerState = {
      peerId: 'peerA',
      status: LocalPeerStatus.started
    }
    const getLocalPeer = makeGetLocalPeer(rootLocalPeer);
    const persistLocalPeer = makePersistLocalPeer(rootLocalPeer);
    const applyLocalPeerStopped = makeApplyLocalPeerStopped();
    const stopLocalPeeHandler = makeHandleStopLocalPeer({
      getLocalPeer,
      persistLocalPeer,
      applyLocalPeerStopped
    });
    const result = await stopLocalPeeHandler(new StopLocalPeer()).run();
    expect(result.isRight()).toBeTruthy();
    const events = result.toMaybe().map(tuple => tuple.snd()).extract();
    expect(events.length).toBe(1);
    expect(rootLocalPeer.status).toBe(LocalPeerStatus.stopped);
  })

  it('should failed when already stopped', async function () {
    const rootLocalPeer: LocalPeerState = {
      peerId: 'peerA',
      status: LocalPeerStatus.stopped
    }
    const getLocalPeer = makeGetLocalPeer(rootLocalPeer);
    const persistLocalPeer = makePersistLocalPeer(rootLocalPeer);
    const applyLocalPeerStopped = makeApplyLocalPeerStopped();
    const stopLocalPeeHandler = makeHandleStopLocalPeer({
      getLocalPeer,
      persistLocalPeer,
      applyLocalPeerStopped
    });
    const result = await stopLocalPeeHandler(new StopLocalPeer()).run();
    expect(result.isLeft()).toBeTruthy();
    const error = result.swap().toMaybe().extract();
    expect(error.message).toBe('local peer already stopped');
  })

})
