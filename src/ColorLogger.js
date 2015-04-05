// ASCII ESCAPE SEQUENCE http://www5c.biglobe.ne.jp/~ecb/assembler2/b_2.html
let levelToColor = {
  v: '[35m[V]', // purple
  d: '[34m[D]', // blue
  i: '[32m[I]', // green
  w: '[33m[W]', // yellow
  e: '[31m[E]'  // red
};

/**
 * display colorful log. now, not support browser.
 *
 * format:
 * "[LogLevel] [Time] [File] inputted log text"
 *
 * format with tag:
 * "[LogLevel] [Time] [File] [Tag] inputted log text"
 *
 * log level and color:
 * verbose: purple
 * debug: blue
 * info: green
 * warning: yellow
 * error: red
 *
 * @example
 * import Logger from 'color-logger'
 *
 * Logger.v('verbose log');
 *
 * let logger = new Logger('MyTag');
 * logger.d('debug log');
 */
export default class ColorLogger {
  /**
   * log information.
   * @return {string} - file name and line number.
   * @private
   */
  static _getInfo() {
    let info;
    try {
      throw new Error();
    } catch (e) {
      let lines = e.stack.split('\n');
      let line = lines[4];
      let matched = line.match(/\/([^/]*?:\d+:\d+)/);
      info = matched[1];
    }

    return info;
  }

  /**
   * if true, display log. default is true.
   */
  static set debug(v) {
    this._debug = v;
  }

  /**
   * display log.
   * @param {string} level - log level. v, d, i, w, e.
   * @param {...*} msg - log message.
   * @returns {string} - formatted log message.
   * @private
   */
  static _output(level, ...msg) {
    if (!this._debug) return '';

    let text = [];
    for (let m of msg) {
      if (typeof m === 'object') {
        text.push(JSON.stringify(m, null, 2));
      } else {
        text.push(m);
      }
    }

    let color = levelToColor[level];
    let info = this._getInfo();
    let d = new Date();
    let now = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
    let log = `${color} [${now}] [${info}] ${text.join(' ')}[0m`;
    console.log(log);
    return log;
  }

  /**
   * display verbose(purple) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  static v(...msg) {
    return this._output('v', ...msg);
  }

  /**
   * display debug(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  static d(...msg) {
    return this._output('d', ...msg);
  }

  /**
   * display info(green) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  static i(...msg) {
    return this._output('i', ...msg);
  }

  /**
   * display warning(yellow) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  static w(...msg) {
    return this._output('w', ...msg);
  }

  /**
   * display warning(red) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  static e(...msg) {
    return this._output('e', ...msg);
  }

  /**
   * create instance.
   * @param {string} tag - tag text.
   */
  constructor(tag) {
    this._tag = tag;
  }

  /**
   * display verbose(purple) log and tag.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  v(...msg) {
    return this.constructor._output('v', `[${this._tag}]`, ...msg);
  }

  /**
   * display debug(blue) log and tag.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  d(...msg) {
    return this.constructor._output('d', `[${this._tag}]`, ...msg);
  }

  /**
   * display info(green) log and tag.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  i(...msg) {
    return this.constructor._output('i', `[${this._tag}]`, ...msg);
  }

  /**
   * display warning(yellow) log and tag.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  w(...msg) {
    return this.constructor._output('w', `[${this._tag}]`, ...msg);
  }

  /**
   * display error(red) log and tag.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  e(...msg) {
    return this.constructor._output('e', `[${this._tag}]`, ...msg);
  }
}

ColorLogger.debug = true;
