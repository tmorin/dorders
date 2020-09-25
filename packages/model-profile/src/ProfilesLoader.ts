import {Component, MessageBus} from '@dorders/framework';
import {LocalPeerStarted} from '@dorders/model-peer';
import {PrivateProfileRepository} from './PrivateProfileRepository';
import {ProfileCreated} from './ProfileCreated';
import {ProfilesLoaded} from './ProfilesLoaded';

/**
 * Once the local peer is started, the private profiles (i.e. profiles hosted by the local peer) have to be loaded.
 * So that, they can be available to other peers.
 */
export class ProfilesLoader extends Component {

  constructor(
    private readonly messageBus: MessageBus,
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
    super();
  }

  async configure(): Promise<void> {
    this.messageBus.on(LocalPeerStarted.EVENT_NAME, this.onPeerStarted.bind(this));
  }

  async onPeerStarted() {
    const profiles = this.privateProfileRepository.iterate();
    for await (const profile of profiles) {
      try {
        const profileCreated = new ProfileCreated({
          profileId: profile.profileId
        });
        await profile.applyProfileCreated(profileCreated);
        await this.messageBus.publish(profileCreated);
      } catch (e) {
        console.warn('unable to start the profile (%s)', profile.profileId, e);
      }
    }
    await this.messageBus.publish(new ProfilesLoaded());
  }

}