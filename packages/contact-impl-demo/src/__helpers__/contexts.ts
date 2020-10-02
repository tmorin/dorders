import {Container} from '@dorders/fwk-model-core';
import {SimplePrivateProfile} from '../../../profile-impl-demo';
import {SimpleContact} from '../SimpleContact';
import {DemoContainers} from './containers';
import {createContact, createPrivateProfile} from './utilities';

export type ContextA = {
  containers: DemoContainers
  container0: Container
  container1: Container
  profileA: SimplePrivateProfile
  createdProfiles: Array<SimplePrivateProfile>
  createdContacts: Array<SimpleContact>
}

export async function configureContextA(): Promise<ContextA> {
  const containers = new DemoContainers();
  const [container0, container1] = await containers.startContainers(2);
  const profileA = await createPrivateProfile(container0, 'profileA');
  const createdProfiles = [
    await createPrivateProfile(container1, 'profileB'),
    await createPrivateProfile(container1, 'profileC'),
    await createPrivateProfile(container1, 'profileD'),
    await createPrivateProfile(container1, 'profileE')
  ];
  const createdContacts = await Promise.all(createdProfiles.map(profile => createContact(container0, profileA.profileId, profile)));
  return {containers, container0, container1, profileA, createdProfiles, createdContacts};
}
