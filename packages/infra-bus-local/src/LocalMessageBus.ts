import {EventEmitter} from 'events';
import {
  Command,
  CommandHandler,
  Event,
  EventListenerCallback,
  Logger,
  LoggerFactory,
  MessageBus,
  MessageName,
  Query,
  QueryHandler,
  Result
} from '@dorders/framework';

export class LocalMessageBus implements MessageBus {

  public readonly eventEmitter: EventEmitter = new EventEmitter()
  private readonly logger: Logger = this.loggerFactory.create(LocalMessageBus.name);

  constructor(
    private readonly loggerFactory: LoggerFactory,
    public readonly commandHandlers: Map<MessageName, CommandHandler> = new Map(),
    public readonly queryHandlers: Map<MessageName, QueryHandler> = new Map(),
  ) {
  }

  registerCommandHandler(name: MessageName, handler: CommandHandler): this {
    this.commandHandlers.set(name, handler);
    return this;
  }

  registerQueryHandler(name: MessageName, handler: QueryHandler): this {
    this.queryHandlers.set(name, handler);
    return this;
  }

  async execute<E extends Event = Event, C extends Command = Command>(command: C): Promise<Array<E>> {
    this.logger.debug('execute command (%s)', command.name, command);
    if (this.commandHandlers.has(command.name)) {
      const events = await this.commandHandlers.get(command.name).handle(command);
      for (const event of events) {
        await this.publish(event);
      }
      // @ts-ignore
      return events;
    }
    throw new Error(`unable to found a command handler for (${command.name.toString()})`,);
  }

  async call<Q extends Query>(query: Q): Promise<Result> {
    this.logger.debug('execute query (%s)', query.name, query);
    if (this.queryHandlers.has(query.name)) {
      return this.queryHandlers.get(query.name).handle(query);
    }
    throw new Error(`unable to found a command handler for (${query.name.toString()})`,);
  }

  async publish<E extends Event>(...messages: Array<E>): Promise<void> {
    for (const message of messages) {
      this.logger.debug('publish message (%s)', message.name, message);
      this.eventEmitter.emit(message.name, message);
    }
  }

  off<E extends Event>(name?: MessageName, listener?: EventListenerCallback<E>): this {
    if (listener) {
      this.eventEmitter.off(name, listener);
    } else {
      this.eventEmitter.removeAllListeners(name);
    }
    return this;
  }

  on<E extends Event>(name: MessageName, listener: EventListenerCallback<E>): this {
    this.eventEmitter.on(name, listener);
    return this;
  }

  once<E extends Event>(name: MessageName, listener: EventListenerCallback<E>): this {
    this.eventEmitter.once(name, listener);
    return this;
  }

  async dispose(): Promise<void> {
    this.off();
    this.commandHandlers.clear();
    this.queryHandlers.clear();
  }

}
