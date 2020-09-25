import {AbstractContainedValidator} from './validator';
import {Containers} from './containers';

class SimpleContainedValidator extends AbstractContainedValidator {
  constructor(
    containers: Containers
  ) {
    super(containers)
  }

  protected async test(): Promise<void> {
    expect(this.containers).toBeTruthy();
  }
}

describe('validator', function () {

  it('should run validator', async function () {
    const simpleContainedValidator = new SimpleContainedValidator(await Containers.create(1));
    await simpleContainedValidator.validate();
  });

})
