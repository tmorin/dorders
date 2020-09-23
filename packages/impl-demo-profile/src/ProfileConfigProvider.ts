import *  as uuid from 'uuid';
import {ConfigProvider} from '@dorders/framework';

export const ProfileConfigScope = Symbol.for('profile');

export interface ProfileConfig {
  repositoryId: string
}

export const ProfileConfigProviderSymbol = Symbol.for('ProfileConfigProvider');

export class ProfileConfigProvider {

  private readonly defaultConfig: ProfileConfig = {
    repositoryId: uuid.v4()
  }

  constructor(
    private readonly configProvider: ConfigProvider
  ) {
  }

  get(): ProfileConfig {
    return this.configProvider.get<ProfileConfig>(ProfileConfigScope, this.defaultConfig);
  }

}
