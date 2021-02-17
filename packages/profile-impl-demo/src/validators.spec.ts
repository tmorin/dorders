import {DemoContainers} from './__helpers__/container';
import {
  CreateProfileValidator,
  DeleteProfileValidator,
  GetProfileValidator,
  ImportProfileValidator,
  ListProfileValidator,
  ProfilesLoaderValidator,
  ProfileSynchronizerValidator,
  UpdateProfileCardValidator
} from '@dorders/profile-validator';

describe('validators', function () {

  it('should pass CreateProfileValidator', async function () {
    await new CreateProfileValidator(await DemoContainers.create()).test();
  });

  it('should pass DeleteProfileValidator', async function () {
    await new DeleteProfileValidator(await DemoContainers.create()).test();
  });

  it('should pass GetProfileValidator', async function () {
    await new GetProfileValidator(await DemoContainers.create()).test();
  });

  it('should pass ImportProfileValidator', async function () {
    await new ImportProfileValidator(await DemoContainers.create()).test();
  });

  it('should pass GetProfileValidator', async function () {
    await new ListProfileValidator(await DemoContainers.create()).test();
  });

  it('should pass ProfilesLoaderValidator', async function () {
    await new ProfilesLoaderValidator(await DemoContainers.create()).test();
  });

  it('should pass ProfileSynchronizerValidator', async function () {
    await new ProfileSynchronizerValidator(await DemoContainers.create()).test();
  });

  it('should pass UpdateProfileCardValidator', async function () {
    await new UpdateProfileCardValidator(await DemoContainers.create()).test();
  });

})
