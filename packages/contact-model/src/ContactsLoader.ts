import {Component, Logger, LoggerFactory, MessageBus} from '@tmorin/ddd-fwk-model-core';
import {ProfileCreated} from '@dorders/profile-model';
import {ContactsLoaded} from './ContactsLoaded';
import {ContactCreated} from './ContactCreated';
import {ContactRepository} from './ContactRepository';

export class ContactsLoader extends Component {

  private readonly logger: Logger;

  constructor(
    private readonly messageBus: MessageBus,
    private readonly contactRepository: ContactRepository,
    private readonly loggerFactory: LoggerFactory
  ) {
    super();
    this.logger = loggerFactory.create(ContactsLoader.name)
  }

  async configure(): Promise<void> {
    this.logger.info('listen to %s', ProfileCreated.EVENT_NAME);
    this.messageBus.on(ProfileCreated.EVENT_NAME, this.onProfileCreated.bind(this));
  }

  async onProfileCreated(profileCreated: ProfileCreated) {
    this.logger.debug('on %o', profileCreated);

    const contacts = this.contactRepository.iterate(profileCreated.body.profileId);
    for await (const contact of contacts) {
      const contactCreated = new ContactCreated({
        profileId: contact.profileId,
        contactId: contact.contactId
      });
      await contact.applyContactCreated(contactCreated);
      await this.messageBus.publish(contactCreated);
    }
    await this.messageBus.publish(new ContactsLoaded({
      profileId: profileCreated.body.profileId
    }));
  }

}
