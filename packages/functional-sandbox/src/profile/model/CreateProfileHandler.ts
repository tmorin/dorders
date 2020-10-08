import {ApplyProfileCreated} from './ApplyProfileCreated';
import {EitherAsync, Tuple} from 'purify-ts';
import {CommandHandler} from '../../fwk/model/CommandHandler';
import {PersistProfile} from './PersistProfile';
import {CreateProfile, CreateProfileResult} from '../api/CreateProfile';
import {defaultProcessCreateProfile, ProcessCreateProfile} from './ProcessCreateProfile';
import {ApplyProfileCardUpdated} from './ApplyProfileCardUpdated';

export interface CreateProfileHandler extends CommandHandler<CreateProfile, CreateProfileResult> {
}

export type MakeHandleStartLocalPeerOptions = {
  persistProfile: PersistProfile
  applyProfileCreated: ApplyProfileCreated
  applyProfileCardUpdated: ApplyProfileCardUpdated
}

export function makeHandleStartLocalPeer(options: MakeHandleStartLocalPeerOptions): CreateProfileHandler {
  const {applyProfileCreated, applyProfileCardUpdated, persistProfile} = options;
  const processStartLocalPeer: ProcessCreateProfile = defaultProcessCreateProfile;
  return (command: CreateProfile) => EitherAsync(async ({fromPromise, liftEither, throwE}) => {
    try {
      const [profileCreated, profileCardUpdated] = await liftEither(processStartLocalPeer(undefined, command));
      let newState = await fromPromise(applyProfileCreated(undefined, profileCreated));
      newState = await fromPromise(applyProfileCardUpdated(newState, profileCardUpdated));
      await fromPromise(persistProfile(newState));
      return Tuple.fromArray([command.toResult({
        profileId: newState.profileId
      }), [profileCreated, profileCardUpdated]]);
    } catch (e) {
      throwE(e);
    }
  });
}
