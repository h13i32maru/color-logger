import babel from 'babel/polyfill';
import assert from 'assert';
import Logger from '../../src/ColorLogger.js';

describe('ColorLogger:', ()=>{
  function test(actual, level, expect) {
    level = level.toUpperCase();
    assert(actual.includes(`[${level}]`));

    let d = new Date();
    let now = `\\[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.\\d+\\]`;
    assert(actual.match(new RegExp(now)));

    assert(actual.match(/\[ColorLoggerTest.js:\d+:\d+\]/));

    assert(actual.includes(expect));
  }

  it('show log.', ()=>{
    let log;

    log = Logger.v('verbose log');
    test(log, 'v', 'verbose log');

    log = Logger.d('debug log');
    test(log, 'd', 'debug log');

    log = Logger.i('info log');
    test(log, 'i', 'info log');

    log = Logger.w('warning log');
    test(log, 'w', 'warning log');

    log = Logger.e('error log');
    test(log, 'e', 'error log');
  });

  it('show tag log.', ()=>{
    let logger = new Logger('MyTag');
    let log;

    log = logger.v('verbose log');
    test(log, 'v', '[MyTag] verbose log');

    log = logger.d('debug log');
    test(log, 'd', '[MyTag] debug log');

    log = logger.i('info log');
    test(log, 'i', '[MyTag] info log');

    log = logger.w('warning log');
    test(log, 'w', '[MyTag] warning log');

    log = logger.e('error log');
    test(log, 'e', '[MyTag] error log');
  });

  it ('show log with object.', ()=>{
    let log = Logger.v({foo: 123, bar: [1, 2, 3]});
    assert(log.includes(`{
  "foo": 123,
  "bar": [
    1,
    2,
    3
  ]
}`));
  });

  it('does not show log.', ()=>{
    Logger.debug = false;
    assert.equal(Logger.e('foo'), '');
    Logger.debug = true;
  });
});
