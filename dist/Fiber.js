'use strict';

exports.__esModule = true;
exports.FIBER_REJECTED = exports.FIBER_RESOLVED = exports.FIBER_RUNNING = exports.FIBER_NOT_STARTED = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIBER_NOT_STARTED = exports.FIBER_NOT_STARTED = 'FIBER_NOT_STARTED';
var FIBER_RUNNING = exports.FIBER_RUNNING = 'FIBER_RUNNING';
var FIBER_RESOLVED = exports.FIBER_RESOLVED = 'FIBER_RESOLVED';
var FIBER_REJECTED = exports.FIBER_REJECTED = 'FIBER_REJECTED';

var Fiber = function () {
  function Fiber( /* async */run) {
    var _this = this;

    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FIBER_NOT_STARTED;
    (0, _classCallCheck3.default)(this, Fiber);

    this.run = function (emit, fiber) {
      return run(emit, fiber);
    };
    this._fiberState = initialState;
    this._listeners = new _set2.default();
    this.promise = new _promise2.default(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    // Bind all public methods for easier functional style
    ['getState', 'emit', 'attach', 'detach', 'start'].forEach(function (key) {
      return _this[key] = _this[key].bind(_this);
    });
  }

  Fiber.prototype.getState = function getState() {
    return this._fiberState;
  };

  Fiber.prototype.emit = function emit() {
    for (var _iterator = this._listeners, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var listener = _ref;

      listener.apply(undefined, arguments);
    }
  };

  Fiber.prototype.attach = function attach(listener) {
    this._listeners.add(listener);
    return this;
  };

  Fiber.prototype.detach = function detach(listener) {
    this._listeners.delete(listener);
    return this;
  };

  Fiber.prototype.start = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this._fiberState !== FIBER_NOT_STARTED)) {
                _context.next = 2;
                break;
              }

              throw Error('Fiber already running');

            case 2:
              this._fiberState = FIBER_RUNNING;
              res = null;
              _context.prev = 4;
              _context.next = 7;
              return this.run(this.emit, this);

            case 7:
              res = _context.sent;
              _context.next = 15;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](4);

              this._fiberState = FIBER_REJECTED;
              _promise2.default.resolve().then(function () {
                return _this2._reject(_context.t0);
              });
              throw _context.t0;

            case 15:
              this._fiberState = FIBER_RESOLVED;
              _promise2.default.resolve().then(function () {
                return _this2._resolve(res);
              });
              return _context.abrupt('return', res);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 10]]);
    }));

    function start() {
      return _ref2.apply(this, arguments);
    }

    return start;
  }();

  return Fiber;
}();

exports.default = Fiber;
//# sourceMappingURL=Fiber.js.map