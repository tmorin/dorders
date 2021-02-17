import {handleQueries, Query, QueryHandler, Result} from '@tmorin/ddd-fwk-model-core';
import {PrivateProfileRepository} from './PrivateProfileRepository';
import {PrivateProfile} from './PrivateProfile';

/**
 * Get the list of hosted profiles.
 */
export class ListProfilesQuery extends Query<void> {
  public static readonly QUERY_NAME = Symbol.for(`profile/${ListProfilesQuery.name}`);

  constructor() {
    super(undefined, ListProfilesQuery.QUERY_NAME);
  }
}

export type ListProfilesResultBody = {
  profiles: Array<PrivateProfile>
}

/**
 * The found profiles.
 */
export type ListProfilesResult = Result<ListProfilesResultBody>

@handleQueries(ListProfilesQuery.QUERY_NAME)
export class ListProfilesHandler implements QueryHandler<ListProfilesQuery, ListProfilesResult> {

  constructor(
    private readonly privateProfileRepository: PrivateProfileRepository
  ) {
  }

  async handle(query: ListProfilesQuery): Promise<ListProfilesResult> {
    const profiles = await this.privateProfileRepository.list();
    return Result.create<ListProfilesResultBody>(query, {profiles});
  }

}
