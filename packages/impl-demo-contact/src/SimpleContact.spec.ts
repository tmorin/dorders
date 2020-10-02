import {SimpleContact} from './SimpleContact';
import {ProfileMap, SimplePublicProfile} from '@dorders/impl-demo-profile';
import {Contact, ContactCreated, ContactDeleted, ContactId, ContactRenamed} from '@dorders/contact-model';
import {ProfileId, PublicProfile} from '@dorders/model-profile';

class DummyContact implements Contact {
  readonly contactId: ContactId = 'contactId';
  readonly name: string = 'name';
  readonly profileId: ProfileId = 'profileId';
  readonly publicProfile: PublicProfile;

  applyContactCreated(contactCreated: ContactCreated): Promise<void> {
    return Promise.resolve(undefined);
  }

  applyContactDeleted(contactDeleted: ContactDeleted): Promise<void> {
    return Promise.resolve(undefined);
  }

  applyContactRenamed(contactRenamed: ContactRenamed): Promise<void> {
    return Promise.resolve(undefined);
  }

}

describe('SimpleContact', function () {
  it('should cast from SimpleContact', function () {
    const contact = new SimpleContact(
      'profileA',
      'contactId',
      'name',
      new SimplePublicProfile(
        'repositoryId',
        'contactId',
        new ProfileMap(
          'repositoryId'
        )
      )
    )
    expect(SimpleContact.from(contact)).toBe(contact);
  })
  it('should not cast when not SimpleContact', function () {
    const contact = new DummyContact();
    expect(() => SimpleContact.from(contact)).toThrow();
  })
})
