import {Container} from '@dorders/framework';
import {startDemoContainers} from '../__helpers__/container';
import {disposeContainers} from '@dorders/infra-test';
import {
  PrivateProfileFactory,
  PrivateProfileFactorySymbol,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol
} from '@dorders/model-profile';

describe('InMemoryPrivateProfileRepository', function () {

  let container0: Container;
  beforeEach(async function () {
    [container0] = await startDemoContainers(1);
  });
  afterEach(async function () {
    await disposeContainers();
  });

  it('should add, list and iterate', async function () {
    const privateProfileRepository0 = container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const privateProfileFactory0 = container0.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);

    const privateProfile0A = await privateProfileFactory0.createFromScratch();
    await privateProfileRepository0.add(privateProfile0A);
    await expect(privateProfileRepository0.add(privateProfile0A)).rejects.toThrow();

    const privateProfile0B = await privateProfileFactory0.createFromScratch();
    await privateProfileRepository0.add(privateProfile0B);

    const privateProfile0C = await privateProfileFactory0.createFromScratch();
    await privateProfileRepository0.add(privateProfile0C);

    {
      const privateProfiles0 = await privateProfileRepository0.list();
      expect(privateProfiles0.length).toBe(3);
    }

    {
      let counter = 0;
      for await (const privateProfile of privateProfileRepository0.iterate()) {
        counter++;
        expect(privateProfile.profileId).toBeTruthy();
      }
      expect(counter).toBe(3);
    }
  })

  it('should add, get and remove', async function () {
    const privateProfileRepository0 = container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const privateProfileFactory0 = container0.registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol);

    const privateProfile0A = await privateProfileFactory0.createFromScratch();
    await privateProfileRepository0.add(privateProfile0A);

    const privateProfile0B = await privateProfileFactory0.createFromScratch();
    await privateProfileRepository0.add(privateProfile0B);

    const privateProfile0C = await privateProfileFactory0.createFromScratch();
    await privateProfileRepository0.add(privateProfile0C);

    {
      const privateProfile0A_bis = await privateProfileRepository0.get(privateProfile0A.profileId);
      expect(privateProfile0A_bis).toBeTruthy();
    }

    await privateProfileRepository0.remove(privateProfile0B);
    await expect(privateProfileRepository0.remove(privateProfile0B)).rejects.toThrow();

    await expect(privateProfileRepository0.get(privateProfile0B.profileId)).rejects.toThrow();
  })

})
