import {
  PrivateProfileRepository,
  ProfileId,
  PublicProfileReferenceDeserializer,
  SerializedPublicProfileReference
} from '@dorders/profile-model';
import {SimpleContact} from './SimpleContact';
import {ContactMapKey} from './ContactMapKey';
import {Contact, ContactFactory, ContactRenamed} from '@dorders/contact-model';
import {SimplePrivateProfile} from '../../profile-impl-demo';

export type SerializedContact = {
  name: string
  reference: SerializedPublicProfileReference
}

export type SerializedContacts = {
  [key: string]: SerializedContact
}

export const SerializedContactRepositorySymbol = Symbol.for('SerializedContactRepository');

export class SerializedContactRepository {

  public constructor(
    private readonly privateProfileRepository: PrivateProfileRepository,
    private readonly publicProfileReferenceDeserializer: PublicProfileReferenceDeserializer,
    private readonly contactFactory: ContactFactory
  ) {
  }

  async persist(contact: SimpleContact) {
    const serializeContacts = await this.read(contact.profileId);
    serializeContacts[contact.contactId] = await this.serializeContact(contact);
    await this.write(contact.profileId, serializeContacts);
  }

  async delete(contact: SimpleContact) {
    const serializeContacts = await this.read(contact.profileId);
    delete serializeContacts[contact.contactId];
    await this.write(contact.profileId, serializeContacts);
  }

  async list(profileId: ProfileId): Promise<Array<SimpleContact>> {
    const serializedContacts = await this.read(profileId);
    const contacts: Array<SimpleContact> = [];
    for (const contactId of Object.keys(serializedContacts)) {
      const serializedContact = serializedContacts[contactId];
      const contact = await this.makeContact(profileId, serializedContact);
      contacts.push(contact);
    }
    return contacts;
  }

  private async getSimplePrivateProfile(profileId: ProfileId): Promise<SimplePrivateProfile> {
    const privateProfile = await this.privateProfileRepository.get(profileId);
    return SimplePrivateProfile.from(privateProfile);
  }

  private async read(profileId: ProfileId): Promise<SerializedContacts> {
    const profile = await this.getSimplePrivateProfile(profileId);
    return JSON.parse(profile.privateMap.get(ContactMapKey.contactList) || '{}');
  }

  private async write(profileId: ProfileId, serializedContacts: SerializedContacts): Promise<void> {
    const profile = await this.getSimplePrivateProfile(profileId);
    profile.privateMap.set(ContactMapKey.contactList, JSON.stringify(serializedContacts));
    profile.privateMap.done();
  }

  private async serializeContact(contact: Contact): Promise<SerializedContact> {
    const name = contact.name;
    const reference = await (await contact.publicProfile.getReference()).serialize();
    return {name, reference};
  }

  private async makeContact(profileId: string, serializedContact: SerializedContact): Promise<SimpleContact> {
    const reference = await this.publicProfileReferenceDeserializer.deserialize(serializedContact.reference);
    const contact = await this.contactFactory.createFromReference(profileId, reference);
    await contact.applyContactRenamed(new ContactRenamed({
      profileId,
      contactId: contact.contactId,
      oldName: contact.name,
      newName: serializedContact.name
    }));
    return SimpleContact.from(contact);
  }

}
