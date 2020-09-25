import {PrivateProfile, ProfileSynchronized, ProfileSynchronizerService} from '@dorders/model-profile';
import {SimplePrivateProfile} from './private';
import {MessageBus} from '@dorders/framework';

export class SimpleProfileSynchronizerService implements ProfileSynchronizerService {

  constructor(
    private readonly bus: MessageBus
  ) {
  }

  async startOngoingSynchronization(profile: PrivateProfile): Promise<void> {
    const simplePrivateProfile = SimplePrivateProfile.from(profile);

    simplePrivateProfile.privateMap.addObserver((newPrivateMap) => {
      simplePrivateProfile.privateMap.replaceBy(newPrivateMap);
      this.bus.publish(new ProfileSynchronized({profileId: profile.profileId}));
    });

    simplePrivateProfile.publicMap.addObserver((newPublicMap) => {
      simplePrivateProfile.publicMap.replaceBy(newPublicMap);
      this.bus.publish(new ProfileSynchronized({profileId: profile.profileId}));
    });

    await this.bus.publish(new ProfileSynchronized({profileId: profile.profileId}));
  }

}
