import {Message, MessageName, MessageType} from './message';

export abstract class Query<M = any> implements Message<M> {

  /* istanbul ignore next */
  protected constructor(
    readonly body: M,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.query
  ) {
  }

}

export abstract class Result<M = any> implements Message<M> {

  /* istanbul ignore next */
  protected constructor(
    readonly body: M,
    readonly name: MessageName,
    readonly type: MessageType = MessageType.result
  ) {
  }

}

export type QueryName = MessageName;

export const QueryHandlerSymbol = Symbol.for('fwk/QueryHandler');

export abstract class QueryHandler<Q extends Query = Query, R extends Result = Result> {

  abstract handle(query: Q): Promise<R>

}

export function handleQueries(...names: Array<QueryName>) {
  return (constructor: Function) => {
    constructor.prototype['__fwkHandledQueryNames'] = names;
  }
}
