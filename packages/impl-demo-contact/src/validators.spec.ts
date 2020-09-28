import {DemoContainers} from './__helpers__/containers';
import {
  AddContactValidator,
  ContactClearerValidator,
  ContactsLoaderValidator,
  ContactsSynchronizerValidator,
  ContactSynchronizerValidator,
  RemoveContactValidator,
  RenameContactValidator
} from '@dorders/validator-contact';

describe('validators', function () {

  it('should pass AddContactValidator', async function () {
    await new AddContactValidator(await DemoContainers.create()).test();
  });

  it('should pass ContactClearerValidator', async function () {
    await new ContactClearerValidator(await DemoContainers.create()).test();
  });

  it('should pass ContactsLoaderValidator', async function () {
    await new ContactsLoaderValidator(await DemoContainers.create()).test();
  });

  it('should pass ContactsSynchronizerValidator', async function () {
    await new ContactsSynchronizerValidator(await DemoContainers.create()).test();
  });

  it('should pass ContactSynchronizerValidator', async function () {
    await new ContactSynchronizerValidator(await DemoContainers.create()).test();
  });

  it('should pass RemoveContactValidator', async function () {
    await new RemoveContactValidator(await DemoContainers.create()).test();
  });

  it('should pass RenameContactValidator', async function () {
    await new RenameContactValidator(await DemoContainers.create()).test();
  });

})
