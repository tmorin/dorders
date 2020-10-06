import {Command, CommandHandler, Container, EmptyResult, Event} from '@dorders/fwk-model-core';
import {LocalMessageBus} from '.';
import {ConsoleLoggerFactory} from '@dorders/fwk-infra-logger-console';

class CommandA extends Command {
  constructor() {
    super(undefined, 'CommandA');
  }
}

class EventA extends Event {
  constructor() {
    super(undefined, 'EventA');
  }
}

class CommandAHandler extends CommandHandler<CommandA, EmptyResult, EventA> {
  async handle(command: Command): Promise<[EmptyResult, Array<Event>]> {
    return [EmptyResult.create(), [new EventA()]];
  }
}

describe('LocalMessageBus/command', function () {

  it('should register and execute command', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));
    bus.registerCommandHandler(CommandA.name, new CommandAHandler());
    const waitForEventA = new Promise(resolve => bus.once('EventA', resolve));
    const [result, [eventA]] = await bus.execute(new CommandA());
    expect(result).toBeTruthy();
    expect(eventA.name).toEqual('EventA');
    const eventABis = await waitForEventA;
    expect(eventABis).toEqual(eventA);
  });

  it('should dispose', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));
    bus.registerCommandHandler(CommandA.name, new CommandAHandler());
    await bus.dispose();
    await expect(bus.execute(new CommandA())).rejects.toThrow('unable to found a command handler for (CommandA)')
  });

});
