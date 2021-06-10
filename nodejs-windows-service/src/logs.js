var EventLogger = require('node-windows').EventLogger;

var log = new EventLogger('Hello World');

log.info('Basic information.');
log.warn('Watch out!');
log.error('Something went wrong.');

log.auditSuccess('AUser Login Success');
log.auditFailure('AUser Login Failure');
