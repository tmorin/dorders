import {PrivateProfile, ProfileSynchronized, ProfileSynchronizerService} from '@dorders/model-profile';
import {SimplePrivateProfile} from './private';
import {MessageBus} from '@dorders/framework';

export class SimpleProfileSynchronizerService implements ProfileSynchronizerService {

  constructor(
    private readonly bus: MessageBus
  ) {
  }

  async startOngoingSynchronization(profile: PrivateProfile): Promise<void> {
    if (profile instanceof SimplePrivateProfile) {

      profile.privateMap.addObserver((newPrivateMap) => {
        profile.privateMap.replaceBy(newPrivateMap);
        this.bus.publish(new ProfileSynchronized({profileId: profile.profileId}));
      });

      profile.publicMap.addObserver((newPublicMap) => {
        profile.publicMap.replaceBy(newPublicMap);
        this.bus.publish(new ProfileSynchronized({profileId: profile.profileId}));
      });

    }
  }

}
