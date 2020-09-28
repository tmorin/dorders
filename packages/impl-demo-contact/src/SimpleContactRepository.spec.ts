import {toArray} from './__helpers__/utilities';
import {Contact, ContactRepository, ContactRepositorySymbol} from '@dorders/model-contact';
import {SimpleContactRepository} from './SimpleContactRepository';
import {SerializedContactRepository, SerializedContactRepositorySymbol} from './SerializedContactRepository';
import {configureContextA, ContextA} from './__helpers__/contexts';

describe('SimpleContactRepository', function () {

  let ctx: ContextA;
  beforeEach(async function () {
    ctx = await configureContextA();
  });
  afterEach(async function () {
    await ctx.containers.disposeContainers();
  });

  it('should persist contacts', async function () {
    const contactRepository0 = ctx.container0.registry.resolve<ContactRepository>(ContactRepositorySymbol);
    await contactRepository0.persist(ctx.createdContacts[0]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    {
      const fetchedContacts: Array<Contact> = await toArray(contactRepository0.iterate(ctx.profileA.profileId));
      fetchedContacts.forEach((contact, index) => {
        expect(contact).toBeTruthy();
        expect(contact).toBe(ctx.createdContacts[index]);
      })
      expect(fetchedContacts.length).toBe(2);
    }
    await contactRepository0.persist(ctx.createdContacts[2]);
    await contactRepository0.persist(ctx.createdContacts[3]);
    {
      const fetchedContacts: Array<Contact> = await toArray(contactRepository0.iterate(ctx.profileA.profileId));
      fetchedContacts.forEach((contact, index) => {
        expect(contact).toBeTruthy();
        expect(contact).toBe(ctx.createdContacts[index]);
      })
      expect(fetchedContacts.length).toBe(4);
    }
  });

  it('should get contacts', async function () {
    const contactRepository0 = ctx.container0.registry.resolve<ContactRepository>(ContactRepositorySymbol);
    await contactRepository0.persist(ctx.createdContacts[0]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    const contact = await contactRepository0.get(ctx.createdContacts[0].profileId, ctx.createdContacts[0].contactId);
    expect(contact).toBeTruthy();
    expect(contact.profileId).toBe(ctx.createdContacts[0].profileId);
    expect(contact.contactId).toBe(ctx.createdContacts[0].contactId);
    expect(contact.name).toBe(ctx.createdContacts[0].name);
  });

  it('should delete contacts', async function () {
    const contactRepository0 = ctx.container0.registry.resolve<ContactRepository>(ContactRepositorySymbol);
    await contactRepository0.persist(ctx.createdContacts[0]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    {
      const fetchedContacts: Array<Contact> = await toArray(contactRepository0.iterate(ctx.profileA.profileId));
      expect(fetchedContacts.length).toBe(2);
    }
    await contactRepository0.delete(ctx.createdContacts[1]);
    {
      const fetchedContacts: Array<Contact> = await toArray(contactRepository0.iterate(ctx.profileA.profileId));
      expect(fetchedContacts.length).toBe(1);
    }
  });

  it('should fail to delete contacts', async function () {
    const contactRepository0 = ctx.container0.registry.resolve<ContactRepository>(ContactRepositorySymbol);
    await expect(contactRepository0.delete(ctx.createdContacts[0])).rejects.toThrowError(/Contact \(.*\) not found/);
  });

  it('should clear contacts', async function () {
    const contactRepository0 = ctx.container0.registry.resolve<SimpleContactRepository>(ContactRepositorySymbol);
    await contactRepository0.persist(ctx.createdContacts[0]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    {
      const fetchedContacts: Array<Contact> = await toArray(contactRepository0.iterate(ctx.profileA.profileId));
      expect(fetchedContacts.length).toBe(2);
    }
    await contactRepository0.clear(ctx.profileA.profileId);
    await contactRepository0.clear(ctx.profileA.profileId);

    expect(contactRepository0.cache.has(ctx.profileA.profileId)).toBeFalsy();
  });

  it('should check cache', async function () {
    const serializedContactRepository0 = ctx.container0.registry.resolve<SerializedContactRepository>(SerializedContactRepositorySymbol);
    const contactRepository0 = ctx.container0.registry.resolve<SimpleContactRepository>(ContactRepositorySymbol);
    await contactRepository0.persist(ctx.createdContacts[0]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    await contactRepository0.persist(ctx.createdContacts[2]);

    await serializedContactRepository0.delete(ctx.createdContacts[0]);
    await serializedContactRepository0.delete(ctx.createdContacts[2]);
    await serializedContactRepository0.persist(ctx.createdContacts[3]);

    const result = await contactRepository0.checkCache(ctx.profileA.profileId);

    expect(result.createdContacts.length).toBe(1);
    expect(result.deletedContacts.length).toBe(2);
  });

  it('should dispose', async function () {
    const contactRepository0 = ctx.container0.registry.resolve<SimpleContactRepository>(ContactRepositorySymbol);
    await contactRepository0.persist(ctx.createdContacts[0]);
    await contactRepository0.persist(ctx.createdContacts[1]);
    await contactRepository0.persist(ctx.createdContacts[2]);
    await contactRepository0.dispose();
    await expect(contactRepository0.get(ctx.profileA.profileId, ctx.createdContacts[0].contactId)).rejects.toThrowError(/Contact \(.*\) not found/);
  });

})

