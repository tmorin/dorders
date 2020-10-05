import {EitherAsync} from 'purify-ts';
import {Event} from './Event';

export interface EventListener<E extends Event = Event> {
  (event: E): EitherAsync<Error, void>
}
