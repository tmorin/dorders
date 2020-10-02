import {SerializedContactRepository, SerializedContactRepositorySymbol} from './SerializedContactRepository';
import {configureContextA, ContextA} from './__helpers__/contexts';

describe('SerializedContactRepository', function () {

  let ctx: ContextA;
  beforeEach(async function () {
    ctx = await configureContextA();
  });
  afterEach(async function () {
    await ctx.containers.disposeContainers();
  });

  it('should persist serialized contacts', async function () {
    const serializedContactRepository0 = ctx.container0.registry.resolve<SerializedContactRepository>(SerializedContactRepositorySymbol);
    await serializedContactRepository0.persist(ctx.createdContacts[0]);
    await serializedContactRepository0.persist(ctx.createdContacts[1]);
    await serializedContactRepository0.persist(ctx.createdContacts[1]);
    {
      const loadedContacts = await serializedContactRepository0.list(ctx.profileA.profileId);
      expect(loadedContacts.length).toBe(2)
    }
    await serializedContactRepository0.persist(ctx.createdContacts[2]);
    await serializedContactRepository0.persist(ctx.createdContacts[3]);
    {
      const loadedContacts = await serializedContactRepository0.list(ctx.profileA.profileId);
      expect(loadedContacts.length).toBe(4)
    }
  });

  it('should delete serialized contacts', async function () {
    const serializedContactRepository0 = ctx.container0.registry.resolve<SerializedContactRepository>(SerializedContactRepositorySymbol);
    await serializedContactRepository0.persist(ctx.createdContacts[0]);
    await serializedContactRepository0.persist(ctx.createdContacts[1]);
    await serializedContactRepository0.persist(ctx.createdContacts[2]);
    await serializedContactRepository0.persist(ctx.createdContacts[3]);
    {
      const loadedContacts = await serializedContactRepository0.list(ctx.profileA.profileId);
      expect(loadedContacts.length).toBe(4)
    }
    await serializedContactRepository0.delete(ctx.createdContacts[1]);
    await serializedContactRepository0.delete(ctx.createdContacts[3]);
    {
      const loadedContacts = await serializedContactRepository0.list(ctx.profileA.profileId);
      expect(loadedContacts.length).toBe(2)
    }
  });

})
