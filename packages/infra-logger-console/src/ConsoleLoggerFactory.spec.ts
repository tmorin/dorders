import {ConsoleLoggerFactory, Level} from '.';

describe('ConsoleLoggerFactory', function () {

  it('should resolve a logger factory', async function () {
    const loggerFactory = new ConsoleLoggerFactory();
    const logger = loggerFactory.create('test');
    expect(logger).toBeTruthy();
    logger.debug('message %s', Level.debug);
    logger.log('message %s', Level.log);
    logger.info('message %s', Level.info);
    logger.warn('message %s', Level.warn);
    logger.error('message %s', Level.error);
  })

})
