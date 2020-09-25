import {ProfileDeleted} from '@dorders/model-profile';
import {ContactsCleared} from './ContactsCleared';
import {Component, LoggerFactory, MessageBus} from '@dorders/framework';
import {ContactRepository} from './ContactRepository';

export class ContactsClearer extends Component {

  private readonly logger;

  constructor(
    private readonly messageBus: MessageBus,
    private readonly contactRepository: ContactRepository,
    private readonly loggerFactory: LoggerFactory,
  ) {
    super();
    this.logger = loggerFactory.create(ContactsClearer.name)
  }

  async configure(): Promise<void> {
    this.messageBus.on(ProfileDeleted.EVENT_NAME, this.onProfileDeleted.bind(this));
  }

  async onProfileDeleted(event: ProfileDeleted) {
    this.logger.debug('on %o', event)

    // remove them from the repository
    await this.contactRepository.clear(event.body.profileId);

    // notify the ending of the process
    await this.messageBus.publish(new ContactsCleared({
      profileId: event.body.profileId
    }));
  }

}
