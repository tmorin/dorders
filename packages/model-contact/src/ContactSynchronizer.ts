import {ContactCreated} from './ContactCreated';
import {ContactSynchronizationService} from './ContactSynchronizationService';
import {Component, Logger, LoggerFactory, MessageBus} from '@dorders/framework';

export class ContactSynchronizer extends Component {

  private readonly logger: Logger;

  constructor(
    private readonly messageBus: MessageBus,
    private readonly contactSynchronizationService: ContactSynchronizationService,
    private readonly loggerFactory: LoggerFactory
  ) {
    super();
    this.logger = loggerFactory.create(ContactSynchronizer.name)
  }

  async configure(): Promise<void> {
    this.logger.info('listen to %s', ContactCreated.EVENT_NAME);
    this.messageBus.on(ContactCreated.EVENT_NAME, this.onContactCreated.bind(this));
  }

  async onContactCreated(contactCreated: ContactCreated) {
    this.logger.debug('on %o', contactCreated);
    await this.contactSynchronizationService.monitor(
      contactCreated.body.profileId,
      contactCreated.body.contactId
    );
  }

}
