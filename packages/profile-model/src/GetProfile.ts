import {handleQueries, Query, QueryHandler, Result} from '@dorders/fwk-model-core';
import {PrivateProfileRepository} from './PrivateProfileRepository';
import {ProfileId} from './Profile';
import {PrivateProfile} from './PrivateProfile';

export type GetProfileBody = {
  profileId: ProfileId
}

/**
 * Get a profile from its profileId.
 */
export class GetProfileQuery extends Query<GetProfileBody> {
  public static readonly QUERY_NAME = Symbol.for(`profile/${GetProfileQuery.name}`);

  constructor(body: GetProfileBody) {
    super(body, GetProfileQuery.QUERY_NAME);
  }
}

/**
 * The found profile.
 */
export class GetProfileResult extends Result<PrivateProfile> {
  constructor(body: PrivateProfile) {
    super(body, GetProfileQuery.QUERY_NAME);
  }
}

@handleQueries(GetProfileQuery.QUERY_NAME)
export class GetProfileHandler implements QueryHandler<GetProfileQuery, GetProfileResult> {

  constructor(
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
  }

  async handle(query: GetProfileQuery): Promise<GetProfileResult> {
    const privateProfile = await this.privateProfileRepository.get(query.body.profileId);
    return new GetProfileResult(privateProfile);
  }

}
