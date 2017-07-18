export const FIBER_NOT_STARTED = 'FIBER_NOT_STARTED';
export const FIBER_RUNNING = 'FIBER_RUNNING';
export const FIBER_RESOLVED = 'FIBER_RESOLVED';
export const FIBER_REJECTED = 'FIBER_REJECTED';

class Fiber {
  constructor(/* async */ run, initialState = FIBER_NOT_STARTED) {
    this.run = (emit, fiber) => run(emit, fiber);
    this._fiberState = initialState;
    this._listeners = new Set();
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    // Bind all public methods for easier functional style
    ['getState', 'emit', 'attach', 'detach', 'start'].forEach(
      key => (this[key] = this[key].bind(this)),
    );
  }

  getState() {
    return this._fiberState;
  }

  emit(...args) {
    for (const listener of this._listeners) {
      listener(...args);
    }
  }

  attach(listener) {
    this._listeners.add(listener);
    return this;
  }

  detach(listener) {
    this._listeners.delete(listener);
    return this;
  }

  async start() {
    if (this._fiberState !== FIBER_NOT_STARTED) {
      throw Error('Fiber already running');
    }
    this._fiberState = FIBER_RUNNING;
    let res = null;
    try {
      res = await this.run(this.emit, this);
    } catch (err) {
      this._fiberState = FIBER_REJECTED;
      Promise.resolve().then(() => this._reject(err));
      throw err;
    }
    this._fiberState = FIBER_RESOLVED;
    Promise.resolve().then(() => this._resolve(res));
    return res;
  }
}

export default Fiber;
