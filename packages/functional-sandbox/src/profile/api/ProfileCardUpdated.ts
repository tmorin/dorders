import {Event} from '../../fwk/model/Event';

export type ProfileCardUpdatedBody = {
  profileId: string
  card: string
}

export class ProfileCardUpdated extends Event<ProfileCardUpdatedBody> {
  constructor(body: ProfileCardUpdatedBody) {
    super(body, ProfileCardUpdated.name);
  }
}
