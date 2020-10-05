import {Command} from '../../fwk/model/Command';

export type CreateProfileBody = {
  card: string
}

export class CreateProfile extends Command<CreateProfileBody> {
  constructor(body: CreateProfileBody) {
    super(body, CreateProfile.name);
  }
}
