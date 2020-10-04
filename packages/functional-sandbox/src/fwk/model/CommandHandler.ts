import {EitherAsync, Tuple} from 'purify-ts';
import {Event} from './Event';
import {Command} from './Command';
import {Result} from './Result';

export interface CommandHandler<C extends Command = Command, R extends Result = Result, E extends Event = Event> {
  (command: C): EitherAsync<Error, Tuple<R, Array<E>>>
}
