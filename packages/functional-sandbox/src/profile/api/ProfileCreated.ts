import {Event} from '../../fwk/model/Event';

export type ProfileCreatedBody = {
  profileId: string
}

export class ProfileCreated extends Event<ProfileCreatedBody> {
  constructor(body: ProfileCreatedBody) {
    super(body, ProfileCreated.name);
  }
}
