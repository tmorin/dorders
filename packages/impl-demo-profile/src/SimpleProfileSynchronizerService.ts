import {
  PrivateProfileRepository,
  ProfileCardUpdated,
  ProfileId,
  ProfileSynchronized,
  ProfileSynchronizerService
} from '@dorders/model-profile';
import {SimplePrivateProfile} from './private';
import {Logger, LoggerFactory, MessageBus} from '@dorders/framework';
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

  async startOngoingSynchronization(profileId: ProfileId): Promise<void> {
    const profile = await this.privateProfileRepository.get(profileId);

    const simplePrivateProfile = SimplePrivateProfile.from(profile);

    simplePrivateProfile.privateMap.addObserver((newPrivateMap) => {
      this.logger.debug('private profile map of (%s) has mutated', profile.profileId);
      simplePrivateProfile.privateMap.replaceBy(newPrivateMap);
      this.bus.publish(new ProfileSynchronized({profileId: profile.profileId}));
    });

    simplePrivateProfile.publicMap.addObserver((newPublicMap) => {
      this.logger.debug('public profile map of (%s) has mutated', profile.profileId);
      // compare the public cards
      const oldPublicCard = simplePrivateProfile.publicMap.get(ProfileMapKey.publicCard);
      const newPublicCard = newPublicMap.get(ProfileMapKey.publicCard);
      const publishProfileSynchronized = newPublicCard !== oldPublicCard;
      // replace the public map
      simplePrivateProfile.publicMap.replaceBy(newPublicMap);
      if (publishProfileSynchronized) {
        // notify profile cad changed
        this.bus.publish(new ProfileCardUpdated({
          profileId: profile.profileId,
          profileCard: newPublicCard
        }));
      }
      this.bus.publish(new ProfileSynchronized({
        profileId: profile.profileId
      }));
    });

    await this.bus.publish(new ProfileSynchronized({
      profileId: profile.profileId
    }));
  }

}
