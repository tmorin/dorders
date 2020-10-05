import {Command} from '../../fwk/model/Command';

export type CreateProfileResultBody = {
  profileId: string
}

export class CreateProfileResult extends Command<CreateProfileResultBody> {
  constructor(body: CreateProfileResultBody) {
    super(body, CreateProfileResult.name);
  }
}
