import {Contact, ContactFactory} from '@dorders/model-contact';
import {ProfileId, PublicProfileReference} from '@dorders/model-profile';
import {ProfileConfigProvider, ProfileMapsRepository, SimplePublicProfile} from '@dorders/impl-demo-profile';
import {SimpleContact} from './SimpleContact';

export class SimpleContactFactory implements ContactFactory {

  constructor(
    private readonly profileConfigProvider: ProfileConfigProvider,
    private readonly profileMapsRepository: ProfileMapsRepository
  ) {
  }

  async createFromReference(profileId: ProfileId, publicProfileReference: PublicProfileReference): Promise<Contact> {
    const repositoryId = this.profileConfigProvider.get().repositoryId;
    const contactPublicMap = this.profileMapsRepository.get(publicProfileReference.profileId).publicMap;
    const contactId = publicProfileReference.profileId;
    const contactName = publicProfileReference.name;
    return new SimpleContact(
      profileId,
      contactId,
      contactName,
      new SimplePublicProfile(
        repositoryId,
        contactId,
        contactPublicMap
      )
    );
  }

}