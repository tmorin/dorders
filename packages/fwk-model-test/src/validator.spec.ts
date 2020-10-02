import {AbstractContainedValidator} from './validator';
import {DummyContainers} from './__helpers__/DummyContainers';

class SimpleValidator extends AbstractContainedValidator {
  public constructor() {
    super(new DummyContainers());
  }

  async test(): Promise<void> {
  }
}

describe('validator', function () {
  it('should invoke test', async function () {
    const simpleValidator = new SimpleValidator();
    const spy = jest.spyOn(simpleValidator, 'test');
    await simpleValidator.validate();
    expect(spy).toHaveBeenCalled();
  });
})
