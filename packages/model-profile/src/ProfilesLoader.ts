import {Component, Logger, LoggerFactory, MessageBus} from '@dorders/fwk-model-core';
import {LocalPeerStarted} from '@dorders/model-peer';
import {PrivateProfileRepository} from './PrivateProfileRepository';
import {ProfileCreated} from './ProfileCreated';
import {ProfilesLoaded} from './ProfilesLoaded';

/**
 * Once the local peer is started, the private profiles (i.e. profiles hosted by the local peer) have to be loaded.
 * So that, they can be available to other peers.
 */
export class ProfilesLoader extends Component {

  private readonly logger: Logger;

  constructor(
    private readonly messageBus: MessageBus,
    private readonly privateProfileRepository: PrivateProfileRepository,
    private readonly loggerFactory: LoggerFactory
  ) {
    super();
    this.logger = loggerFactory.create(ProfilesLoader.name)
  }

  async configure(): Promise<void> {
    this.messageBus.on(LocalPeerStarted.EVENT_NAME, this.onLocalPeerStarted.bind(this));
  }

  async onLocalPeerStarted(localPeerStarted: LocalPeerStarted) {
    this.logger.debug('on %o', localPeerStarted);

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
