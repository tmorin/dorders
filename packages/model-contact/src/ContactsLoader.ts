import {Component, MessageBus} from '@dorders/framework';
import {ProfileCreated} from '@dorders/model-profile';
import {ContactsLoaded} from './ContactsLoaded';
import {ContactCreated} from './ContactCreated';
import {ContactRepository} from './ContactRepository';

export class ContactsLoader extends Component {

  constructor(
    private readonly messageBus: MessageBus,
    private readonly contactRepository: ContactRepository
  ) {
    super();
  }

  async configure(): Promise<void> {
    this.messageBus.on(ProfileCreated.EVENT_NAME, this.onProfileCreated.bind(this));
  }

  async onProfileCreated(event: ProfileCreated) {
    const contacts = this.contactRepository.iterate(event.body.profileId);
    for await (const contact of contacts) {
      const contactCreated = new ContactCreated({
        profileId: contact.profileId,
        contactId: contact.contactId
      });
      await contact.applyContactCreated(contactCreated);
      await this.messageBus.publish(contactCreated);
    }
    await this.messageBus.publish(new ContactsLoaded({
      profileId: event.body.profileId
    }));
  }

}
