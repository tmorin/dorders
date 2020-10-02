import {ConsoleLoggerFactory, Level} from '.';
import {Container} from '@dorders/fwk-model-core';

describe('ConsoleLoggerFactory', function () {

  it('should resolve a logger factory', async function () {
    const containerA = new Container({      name: 'container-test'});
    const loggerFactoryA = new ConsoleLoggerFactory(containerA);
    const loggerA = loggerFactoryA.create('test');
    expect(loggerA).toBeTruthy();
    loggerA.debug('message %s', Level.debug);
    loggerA.log('message %s', Level.log);
    loggerA.info('message %s', Level.info);
    
    const containerB = new Container();
    const loggerFactoryB = new ConsoleLoggerFactory(containerB);
    const loggerB = loggerFactoryB.create('test');
    expect(loggerB).toBeTruthy();
    loggerB.warn('message %s', Level.warn);
    loggerB.error('message %s', Level.error);
  })

})
