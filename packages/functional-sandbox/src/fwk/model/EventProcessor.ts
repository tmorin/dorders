import {EitherAsync} from 'purify-ts';
import {Event} from './Event';

export interface EventProcessor<S = any, E extends Event = Event> {
  (state: S, event: E): EitherAsync<Error, S>
}
