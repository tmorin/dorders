import {Command, CommandHandler, handleCommands} from './command';
import {Event} from './event';

class CommandA extends Command {
  constructor() {
    super(undefined, CommandA.name);
  }
}

class EventA extends Event {
  constructor() {
    super(undefined, EventA.name);
  }
}

@handleCommands(CommandA.name)
class CommandAHandler implements CommandHandler<CommandA> {
  async handle(command: CommandA): Promise<Array<EventA>> {
    return [new EventA()];
  }
}

describe('command', function () {

  it('should flags handler with @handleCommands', function () {
    expect(CommandAHandler['prototype']['__fwkHandledCommandNames']).toContainEqual(CommandA.name);
    const commandAHandler = new CommandAHandler();
    expect(commandAHandler['__fwkHandledCommandNames']).toContainEqual(CommandA.name);
  });

})
