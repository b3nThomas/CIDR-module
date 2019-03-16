import * as Bunyan from 'bunyan';

const log = Bunyan.createLogger({
    name: 'my-app',
    level: 'debug',
    serializers: Bunyan.stdSerializers,
    src: true
});

log.info('I am alive!');