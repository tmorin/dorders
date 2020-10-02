import {Command, CommandHandler, Container, Event} from '@dorders/fwk-model-core';
import {LocalMessageBus} from '.';
import {ConsoleLoggerFactory} from '@dorders/infra-logger-console';

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

class CommandAHandler extends CommandHandler<CommandA, EventA> {
  async handle(command: Command): Promise<Array<Event>> {
    return [new EventA()];
  }
}

describe('LocalMessageBus/command', function () {

  it('should register and execute command', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));
    bus.registerCommandHandler(CommandA.name, new CommandAHandler());
    const waitForEventA = new Promise(resolve => bus.once('EventA', resolve));
    const [eventA] = await bus.execute(new CommandA());
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
