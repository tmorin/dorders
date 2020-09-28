import {PrivateProfileRepository} from './PrivateProfileRepository';
import {ProfileCreated} from './ProfileCreated';
import {Component, Logger, LoggerFactory, MessageBus} from '@dorders/framework';
import {ProfileSynchronizerService} from './ProfileSynchronizerService';

export class ProfileSynchronizer extends Component {

  private readonly logger: Logger;

  constructor(
    protected readonly messageBus: MessageBus,
    protected readonly privateProfileRepository: PrivateProfileRepository,
    protected readonly profileSynchronizerService: ProfileSynchronizerService,
    private readonly loggerFactory: LoggerFactory
  ) {
    super();
    this.logger = loggerFactory.create(ProfileSynchronizer.name)
  }

  async configure(): Promise<void> {
    this.messageBus.on(ProfileCreated.EVENT_NAME, this.onProfileCreated.bind(this));
  }

  async onProfileCreated(profileCreated: ProfileCreated) {
    this.logger.debug('on %o', profileCreated);
    const profile = await this.privateProfileRepository.get(profileCreated.body.profileId);
    await this.profileSynchronizerService.startOngoingSynchronization(profile);
  }

}
