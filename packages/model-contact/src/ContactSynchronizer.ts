import {ContactCreated} from './ContactCreated';
import {ContactSynchronizationService} from './ContactSynchronizationService';
import {Component, MessageBus} from '@dorders/framework';

export class ContactSynchronizer extends Component {

  constructor(
    private readonly messageBus: MessageBus,
    private readonly contactSynchronizationService: ContactSynchronizationService
  ) {
    super();
  }

  async configure(): Promise<void> {
    this.messageBus.on(ContactCreated.EVENT_NAME, this.onContactCreated.bind(this));
  }

  async onContactCreated(contactCreated: ContactCreated) {
    await this.contactSynchronizationService.monitor(
      contactCreated.body.profileId,
      contactCreated.body.contactId
    );
  }

}
