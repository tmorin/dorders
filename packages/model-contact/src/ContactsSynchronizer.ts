import {ProfileSynchronized} from '@dorders/model-profile';
import {ContactsSynchronized} from './ContactsSynchronized';
import {ContactSynchronizationService} from './ContactSynchronizationService';
import {Component, MessageBus} from '@dorders/framework';

/**
 * The process is responsible to synchronise the contacts list
 */
export class ContactsSynchronizer extends Component {

  constructor(
    private readonly messageBus: MessageBus,
    private readonly contactSynchronizationService: ContactSynchronizationService
  ) {
    super();
  }

  async configure(): Promise<void> {
    this.messageBus.on(ProfileSynchronized.EVENT_NAME, this.onProfileSynchronized.bind(this));
  }

  async onProfileSynchronized(profileSynchronized: ProfileSynchronized) {
    const profileId = profileSynchronized.body.profileId;

    // delegate to the infrastructure the merging logic of the ongoing synchronizations about contacts
    await this.contactSynchronizationService.check(profileId);

    // notify the end of the process
    await this.messageBus.publish(new ContactsSynchronized({
      profileId: profileSynchronized.body.profileId
    }));
  }

}
