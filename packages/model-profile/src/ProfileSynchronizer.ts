import {PrivateProfileRepository} from './PrivateProfileRepository';
import {ProfileCreated} from './ProfileCreated';
import {Component, MessageBus} from '@dorders/framework';
import {ProfileSynchronizerService} from './ProfileSynchronizerService';

export class ProfileSynchronizer extends Component {

  constructor(
    protected readonly messageBus: MessageBus,
    protected readonly privateProfileRepository: PrivateProfileRepository,
    protected readonly profileSynchronizerService: ProfileSynchronizerService,
  ) {
    super();
  }

  async configure(): Promise<void> {
    this.messageBus.on(ProfileCreated.EVENT_NAME, this.onProfileCreated.bind(this));
  }

  async onProfileCreated(profileCreated: ProfileCreated) {
    const profile = await this.privateProfileRepository.get(profileCreated.body.profileId);
    await this.profileSynchronizerService.startOngoingSynchronization(profile);
  }

}
