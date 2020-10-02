import {FwkInfraTestContainers} from './FwkInfraTestContainers';
import {AbstractContainedValidator} from '@dorders/fwk-model-test';

class SimpleContainedValidator extends AbstractContainedValidator {
  constructor(
    containers: FwkInfraTestContainers
  ) {
    super(containers)
  }

  protected async test(): Promise<void> {
    expect(this.containers).toBeTruthy();
  }
}

describe('validator', function () {

  it('should run validator', async function () {
    const simpleContainedValidator = new SimpleContainedValidator(await FwkInfraTestContainers.create(1));
    await simpleContainedValidator.validate();
  });

})
