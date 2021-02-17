import {ProfileSynchronized} from '@dorders/profile-model';
import {ContactsSynchronized} from './ContactsSynchronized';
import {ContactSynchronizationService} from './ContactSynchronizationService';
import {Component, Logger, LoggerFactory, MessageBus} from '@tmorin/ddd-fwk-model-core';

/**
 * The process is responsible to synchronise the contacts list
 */
export class ContactsSynchronizer extends Component {

  private readonly logger: Logger;

  constructor(
    private readonly messageBus: MessageBus,
    private readonly contactSynchronizationService: ContactSynchronizationService,
    private readonly loggerFactory: LoggerFactory
  ) {
    super();
    this.logger = loggerFactory.create(ContactsSynchronizer.name)
  }

  async configure(): Promise<void> {
    this.logger.info('listen to %s', ProfileSynchronized.EVENT_NAME);
    this.messageBus.on(ProfileSynchronized.EVENT_NAME, this.onProfileSynchronized.bind(this));
  }

  async onProfileSynchronized(profileSynchronized: ProfileSynchronized) {
    this.logger.debug('on %o', profileSynchronized);

    const profileId = profileSynchronized.body.profileId;

    // delegate to the infrastructure the merging logic of the ongoing synchronizations about contacts
    await this.contactSynchronizationService.check(profileId);

    // notify the end of the process
    await this.messageBus.publish(new ContactsSynchronized({profileId}));
  }

}
