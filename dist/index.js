'use strict';

exports.__esModule = true;
exports.FIBER_RESOLVED = exports.FIBER_REJECTED = exports.FIBER_RUNNING = exports.FIBER_NOT_STARTED = exports.Fiber = undefined;

var _Fiber = require('./Fiber');

Object.defineProperty(exports, 'Fiber', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Fiber).default;
  }
});
Object.defineProperty(exports, 'FIBER_NOT_STARTED', {
  enumerable: true,
  get: function get() {
    return _Fiber.FIBER_NOT_STARTED;
  }
});
Object.defineProperty(exports, 'FIBER_RUNNING', {
  enumerable: true,
  get: function get() {
    return _Fiber.FIBER_RUNNING;
  }
});
Object.defineProperty(exports, 'FIBER_REJECTED', {
  enumerable: true,
  get: function get() {
    return _Fiber.FIBER_REJECTED;
  }
});
Object.defineProperty(exports, 'FIBER_RESOLVED', {
  enumerable: true,
  get: function get() {
    return _Fiber.FIBER_RESOLVED;
  }
});

var _Fiber2 = _interopRequireDefault(_Fiber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reduceFiber = function reduceFiber(_ref) {
  var dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (action instanceof _Fiber2.default) {
        var fiber = action;
        fiber.attach(dispatch);
        return function () {
          return fiber.detach(dispatch);
        };
      }
      return next(action);
    };
  };
};

exports.default = reduceFiber;
//# sourceMappingURL=index.js.map