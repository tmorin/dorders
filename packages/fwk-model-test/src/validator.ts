import {Containers} from './containers';

export interface Validator {

  validate(): Promise<void>

}

export abstract class AbstractContainedValidator implements Validator {

  protected constructor(
    protected containers: Containers
  ) {
  }

  protected abstract test(): Promise<void>

  protected async before(): Promise<void> {
  }

  async validate(): Promise<void> {
    try {
      await this.before();
      await this.test();
    } finally {
      await this.after();
    }
  }

  protected async after(): Promise<void> {
    await this.containers.disposeContainers();
  }

}
