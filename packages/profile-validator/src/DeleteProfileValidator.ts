import {AbstractContainedValidator, Containers, waitForOnce} from '@dorders/fwk-model-test';
import {
  CreateProfile,
  DeleteProfile,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileCreated,
  ProfileDeleted
} from '@dorders/profile-model';

export class DeleteProfileValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0] = await this.containers.startContainers(1);

    const pWaitForEvents = waitForOnce(container0, ProfileDeleted.EVENT_NAME);

    const [, [profileACreated]] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileA'}));
    expect(profileACreated).toBeTruthy();
    expect(profileACreated.body.profileId).toBeTruthy();

    const [, [profileBCreated]] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileB'}));
    expect(profileBCreated).toBeTruthy();
    expect(profileBCreated.body.profileId).toBeTruthy();

    const [, [profileCCreated]] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileC'}));
    expect(profileCCreated).toBeTruthy();
    expect(profileCCreated.body.profileId).toBeTruthy();

    const privateProfileRepository0 = await container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);

    const beforeProfiles = await privateProfileRepository0.list();
    expect(beforeProfiles.length).toEqual(3);

    const [, [profileBDeleted]] = await container0.messageBus.execute<ProfileDeleted>(new DeleteProfile({profileId: profileBCreated.body.profileId}));
    expect(profileBDeleted).toBeTruthy();
    expect(profileBDeleted.body.profileId).toEqual(profileBCreated.body.profileId);

    const afterProfiles = await privateProfileRepository0.list();
    expect(afterProfiles.length).toEqual(2);

    await pWaitForEvents;
  }

}
