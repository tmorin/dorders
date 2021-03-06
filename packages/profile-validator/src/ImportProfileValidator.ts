import {AbstractContainedValidator, Containers, waitForOnce} from '@tmorin/ddd-fwk-model-test';
import {
  CreateProfile,
  ImportProfile,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileCreated,
  ProfileSynchronized
} from '@dorders/profile-model';

export class ImportProfileValidator extends AbstractContainedValidator {

  constructor(
    containers: Containers
  ) {
    super(containers);
  }

  async test(): Promise<void> {
    const [container0, container1] = await this.containers.startContainers(2);

    const pWaitForEvents = waitForOnce(container1, ProfileCreated.EVENT_NAME, ProfileSynchronized.EVENT_NAME);

    const [, [profileACreated0]] = await container0.messageBus.execute<ProfileCreated>(new CreateProfile({profileCard: 'ProfileA'}));
    expect(profileACreated0).toBeTruthy();
    expect(profileACreated0.body.profileId).toBeTruthy();

    const privateProfileRepository0 = await container0.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const profileA0 = await privateProfileRepository0.get(profileACreated0.body.profileId);
    const profileARef0 = await profileA0.getReference();
    const profileARef0AsString = await profileARef0.serialize();

    const [, [profileACreated1]] = await container1.messageBus.execute<ProfileCreated>(new ImportProfile({serializedReference: profileARef0AsString}));
    expect(profileACreated1).toBeTruthy();
    expect(profileACreated1.body.profileId).toBeTruthy();

    await pWaitForEvents;

    const privateProfileRepository1 = await container1.registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol);
    const profileA1 = await privateProfileRepository1.get(profileACreated1.body.profileId);
    const profileARef1 = await profileA1.getReference();
    const profileARef1AsString = await profileARef1.serialize();
    expect(profileA0.profileId).toEqual(profileA1.profileId);
    expect(profileARef0AsString).toEqual(profileARef1AsString);
  }

}
