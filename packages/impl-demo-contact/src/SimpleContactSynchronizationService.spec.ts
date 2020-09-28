import {configureContextA, ContextA} from './__helpers__/contexts';
import {SerializedContactRepository, SerializedContactRepositorySymbol} from './SerializedContactRepository';
import {createContact, createPrivateProfile} from './__helpers__/utilities';
import {SimpleContactSynchronizationService} from './SimpleContactSynchronizationService';
import {
  ContactCreated,
  ContactDeleted,
  ContactRepository,
  ContactRepositorySymbol,
  ContactSynchronizationService,
  ContactSynchronizationServiceSymbol,
  ContactSynchronized
} from '@dorders/model-contact';
import {waitForMany} from '@dorders/infra-test';

describe('SimpleContactSynchronizationService', function () {

  let ctx: ContextA;
  beforeEach(async function () {
    ctx = await configureContextA();
  });
  afterEach(async function () {
    await ctx.containers.disposeContainers();
  });

  it('should check', async function () {
    const waitContactCreated = waitForMany(ctx.container0, ContactCreated.EVENT_NAME, 1);
    const waitContactDeleted = waitForMany(ctx.container0, ContactDeleted.EVENT_NAME, 1);
    const serializedContactRepository0 = ctx.container0.registry.resolve<SerializedContactRepository>(SerializedContactRepositorySymbol);
    const contactRepository0 = ctx.container0.registry.resolve<ContactRepository>(ContactRepositorySymbol);
    // add 4 contacts
    for (const createdContact of ctx.createdContacts) {
      await contactRepository0.persist(createdContact);
    }
    // remove first
    {
      const contactList = await serializedContactRepository0.list(ctx.profileA.profileId);
      await serializedContactRepository0.delete(contactList[0]);
    }
    // add new one
    {
      const profileF = await createPrivateProfile(ctx.container1, 'profileF');
      const contactF = await createContact(ctx.container0, ctx.profileA.profileId, profileF);
      await serializedContactRepository0.persist(contactF);
    }
    // check
    const contactSynchronizationService = ctx.container0.registry.resolve<ContactSynchronizationService>(ContactSynchronizationServiceSymbol);
    // check
    await contactSynchronizationService.check(ctx.profileA.profileId);
    // wait for side effects
    await waitContactCreated;
    await waitContactDeleted;
  });

  it('should monitor', async function () {
    const waitContactSynchronized = waitForMany(ctx.container0, ContactSynchronized.EVENT_NAME, 1);
    // add contact
    const contactRepository0 = ctx.container0.registry.resolve<ContactRepository>(ContactRepositorySymbol);
    await contactRepository0.persist(ctx.createdContacts[0]);
    // monitor contact
    const contactSynchronizationService = ctx.container0.registry.resolve<ContactSynchronizationService>(ContactSynchronizationServiceSymbol);
    await contactSynchronizationService.monitor(ctx.createdContacts[0].profileId, ctx.createdContacts[0].contactId);
    // trigger changes from the private profile of the contact
    ctx.createdProfiles[0].publicMap.set('key', 'val').done();
    // wait for side effects
    await waitContactSynchronized;
  });

})
