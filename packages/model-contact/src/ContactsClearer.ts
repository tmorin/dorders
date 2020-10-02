import {ProfileDeleted} from '@dorders/model-profile';
import {ContactsCleared} from './ContactsCleared';
import {Component, LoggerFactory, MessageBus} from '@dorders/fwk-model-core';
import {ContactRepository} from './ContactRepository';
import {ContactDeleted} from './ContactDeleted';

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
    const contacts = await this.contactRepository.clear(event.body.profileId);

    // apply the ContactDeleted events
    for (const contact of contacts) {
      const contactDeleted = new ContactDeleted({
        profileId: event.body.profileId,
        contactId: contact.contactId
      });
      await contact.applyContactDeleted(contactDeleted);
      await this.messageBus.publish(contactDeleted);
    }

    // notify the ending of the process
    await this.messageBus.publish(new ContactsCleared({
      profileId: event.body.profileId
    }));
  }

}
