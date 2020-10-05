import {CreateProfile} from '../api/CreateProfile';
import {ProfileCreated} from '../api/ProfileCreated';
import {Either, Maybe} from 'purify-ts';
import * as uuid from 'uuid';
import {ProfileCardUpdated} from '../api/ProfileCardUpdated';

export type CreateProfileEvents = [ProfileCreated, ProfileCardUpdated];

export interface ProcessCreateProfile {
  (state: void, command: CreateProfile): Either<Error, CreateProfileEvents>
}

export function defaultProcessCreateProfile(state: void, command: CreateProfile): Either<Error, CreateProfileEvents> {
  return Maybe.of<CreateProfileEvents>([
    new ProfileCreated({
      profileId: uuid.v4()
    }),
    new ProfileCardUpdated({
      profileId: uuid.v4(),
      card: command.body.card
    })
  ]).toEither(new Error('cannot create profile'));
}
