import {Command} from '../../fwk/model/Command';
import {Result} from '../../fwk/model/Result';
import {ProfileId} from './ProfileId';

export type CreateProfileBody = {
  card: string
}

export type CreateProfileResult = Result<{
  profileId: ProfileId
}>

export class CreateProfile extends Command<CreateProfileBody> {
  constructor(body: CreateProfileBody) {
    super(body, CreateProfile.name);
  }
}
