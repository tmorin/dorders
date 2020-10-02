import {Event, EventListenerCallback, EventName} from './event';
import {Command, CommandHandler, CommandName} from './command';
import {Query, QueryHandler, QueryName, Result} from './query';

export const MessageBusSymbol = Symbol.for('fwk/MessageBus');

/**
 * The message bus is responsible to transfer messages.
 * It provides an API to send message and also to react on them.
 */
export interface MessageBus {

  /**
   * Register a command handler.
   * @param name the name of the command
   * @param handler the handler
   */
  registerCommandHandler(name: CommandName, handler: CommandHandler): this

  /**
   * Execute a command.
   * @param command the command
   */
  execute<E extends Event = Event, C extends Command = Command>(command: C): Promise<Array<E>>

  /**
   * Register a query handler.
   * @param name the name of the query
   * @param handler the handler
   */
  registerQueryHandler(name: QueryName, handler: QueryHandler): this

  /**
   * Call a query.
   * @param query the query
   */
  call<Q extends Query>(query: Q): Promise<Result>

  /**
   * Publish events to the bus.
   * @param events the events
   */
  publish<E extends Event>(...events: Array<E>): Promise<void>

  /**
   * Listen and react on an event.
   * @param name the name of the event
   * @param listener the listener
   */
  on<E extends Event>(name: EventName, listener: EventListenerCallback<E>): this

  /**
   * Listen and react once on an event.
   * @param name the name of the event
   * @param listener the listener
   */
  once<E extends Event>(name: EventName, listener: EventListenerCallback<E>): this

  /**
   * Remove one or several listeners.
   * When the event name is set, it removes only the related listeners.
   * When the listener function is set, it removes only the related listener.
   * When both are empty , it removes all event listeners.
   * @param name an optional name
   * @param listener an optional listener
   */
  off<E extends Event>(name?: EventName, listener?: EventListenerCallback<E>): this

  /**
   * Unregister all commands, queries and remove all event listeners.
   */
  dispose(): Promise<void>
}
