import {
  PrivateProfileRepository,
  ProfileCardUpdated,
  ProfileId,
  ProfileSynchronized,
  ProfileSynchronizerService
} from '@dorders/profile-model';
import {SimplePrivateProfile} from './private';
import {Logger, LoggerFactory, MessageBus} from '@dorders/fwk-model-core';
import {ProfileMapKey} from './map';

export class SimpleProfileSynchronizerService implements ProfileSynchronizerService {

  private readonly logger: Logger

  constructor(
    private readonly bus: MessageBus,
    private readonly loggerFactory: LoggerFactory,
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
    this.logger = loggerFactory.create(SimpleProfileSynchronizerService.name)
  }

  private async notifyProfileSynchronized(simplePrivateProfile: SimplePrivateProfile) {
    const profileSynchronized = new ProfileSynchronized({profileId: simplePrivateProfile.profileId})
    await simplePrivateProfile.applyProfilesSynchronized(profileSynchronized)
    await this.bus.publish(profileSynchronized);
  }

  async startOngoingSynchronization(profileId: ProfileId): Promise<void> {
    const profile = await this.privateProfileRepository.get(profileId);

    const simplePrivateProfile = SimplePrivateProfile.from(profile);

    simplePrivateProfile.privateMap.addObserver(async (newPrivateMap) => {
      this.logger.debug('private profile map of (%s) has mutated', profile.profileId);
      simplePrivateProfile.privateMap.replaceBy(newPrivateMap);
      await this.notifyProfileSynchronized(simplePrivateProfile);
    });

    simplePrivateProfile.publicMap.addObserver(async (newPublicMap) => {
      this.logger.debug('public profile map of (%s) has mutated', profile.profileId);
      // compare the public cards
      const oldPublicCard = simplePrivateProfile.publicMap.get(ProfileMapKey.publicCard);
      const newPublicCard = newPublicMap.get(ProfileMapKey.publicCard);
      const publishProfileSynchronized = newPublicCard !== oldPublicCard;
      // replace the public map
      simplePrivateProfile.publicMap.replaceBy(newPublicMap);
      if (publishProfileSynchronized) {
        const profileCardUpdated = new ProfileCardUpdated({
          profileId: profile.profileId,
          profileCard: newPublicCard
        });
        await simplePrivateProfile.applyProfileCardUpdated(profileCardUpdated)
        // notify profile cad changed
        await this.bus.publish(profileCardUpdated);
      }
      await this.notifyProfileSynchronized(simplePrivateProfile);
    });

    await this.notifyProfileSynchronized(simplePrivateProfile);
  }

}
