import {handleQueries, Query, QueryHandler} from './query';
import {Result} from './result';

class QueryA extends Query {
  constructor() {
    super(undefined, QueryA.name);
  }
}

class ResultA extends Result {
  constructor() {
    super(undefined, ResultA.name);
  }
}

@handleQueries(QueryA.name)
class QueryAHandler implements QueryHandler<QueryA, ResultA> {
  async handle(query: QueryA): Promise<ResultA> {
    return new ResultA();
  }
}

describe('query', function () {

  it('should flags handler with @handleQueries', function () {
    expect(QueryAHandler['prototype']['__fwkHandledQueryNames']).toContainEqual(QueryA.name);
    const queryAHandler = new QueryAHandler();
    expect(queryAHandler['__fwkHandledQueryNames']).toContainEqual(QueryA.name);
  });

})
