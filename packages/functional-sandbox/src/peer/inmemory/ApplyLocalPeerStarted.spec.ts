import {LocalPeerState, LocalPeerStatus} from '../model/LocalPeerState';
import {makeHandleStartLocalPeer} from '../model/StartLocalPeerHandler';
import {StartLocalPeer} from '../api/StartLocalPeer';
import {makeGetLocalPeer, makePersistLocalPeer} from './repository';
import {makeApplyLocalPeerStarted} from './ApplyLocalPeerStarted';

describe('ApplyLocalPeerStarted', function () {

  it('should succeed', async function () {
    const rootLocalPeer: LocalPeerState = {
      peerId: 'peerA',
      status: LocalPeerStatus.stopped
    }
    const getLocalPeer = makeGetLocalPeer(rootLocalPeer);
    const persistLocalPeer = makePersistLocalPeer(rootLocalPeer);
    const applyLocalPeerStarted = makeApplyLocalPeerStarted();
    const handleStartLocalPeer = makeHandleStartLocalPeer({
      getLocalPeerState: getLocalPeer,
      persistLocalPeerState: persistLocalPeer,
      applyLocalPeerStarted
    });
    const result = await handleStartLocalPeer(new StartLocalPeer()).run();
    expect(result.isRight()).toBeTruthy();
    const events = result.toMaybe().map(tuple => tuple.snd()).extract();
    expect(events.length).toBe(1);
    expect(rootLocalPeer.status).toBe(LocalPeerStatus.started);
  })

  it('should failed when already started', async function () {
    const rootLocalPeer: LocalPeerState = {
      peerId: 'peerA',
      status: LocalPeerStatus.started
    }
    const getLocalPeer = makeGetLocalPeer(rootLocalPeer);
    const applyLocalPeerStarted = makeApplyLocalPeerStarted();
    const persistLocalPeer = makePersistLocalPeer(rootLocalPeer);
    const handleStartLocalPeer = makeHandleStartLocalPeer({
      getLocalPeerState: getLocalPeer,
      persistLocalPeerState: persistLocalPeer,
      applyLocalPeerStarted
    });
    const result = await handleStartLocalPeer(new StartLocalPeer()).run();
    expect(result.isLeft()).toBeTruthy();
    const error = result.swap().toMaybe().extract();
    expect(error.message).toBe('local peer already started');
  })

})
