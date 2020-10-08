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
    const messages = await handleStartLocalPeer(new StartLocalPeer()).run();
    expect(messages.isRight()).toBeTruthy();
    const result = messages.toMaybe().map(tuple => tuple.fst()).extract();
    expect(result.body.peerId).toBeTruthy();
    const events = messages.toMaybe().map(tuple => tuple.snd()).extract();
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
    const messages = await handleStartLocalPeer(new StartLocalPeer()).run();
    expect(messages.isLeft()).toBeTruthy();
    const error = messages.swap().toMaybe().extract();
    expect(error.message).toBe('local peer already started');
  })

})
