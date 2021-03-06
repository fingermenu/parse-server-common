'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectUserFeedback = exports.createUserFeedback = exports.createUserFeedbackInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _TestHelper = require('../../../TestHelper');

var _TestHelper2 = _interopRequireDefault(_TestHelper);

var _ = require('..');

var _RestaurantService = require('../../services/__tests__/RestaurantService.test');

var _RestaurantService2 = _interopRequireDefault(_RestaurantService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();

var createUserFeedbackInfo = exports.createUserFeedbackInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var restaurant, addedByUser, servingTime;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _RestaurantService2.default)(1);

          case 2:
            restaurant = _context.sent.first();
            _context.next = 5;
            return _TestHelper2.default.createUser();

          case 5:
            addedByUser = _context.sent;
            servingTime = (0, _immutable.Map)({
              questionAndAnswers: _TestHelper2.default.createRandomList(),
              others: chance.string(),
              submittedAt: new Date(),
              restaurantId: restaurant.get('id'),
              addedByUserId: addedByUser.id
            });
            return _context.abrupt('return', {
              servingTime: servingTime,
              restaurant: restaurant,
              addedByUser: addedByUser
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createUserFeedbackInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createUserFeedback = exports.createUserFeedback = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _.UserFeedback;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createUserFeedbackInfo();

          case 5:
            _context2.t1 = _context2.sent.servingTime;

          case 6:
            _context2.t2 = _context2.t1;
            return _context2.abrupt('return', _context2.t0.spawn.call(_context2.t0, _context2.t2));

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createUserFeedback(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var expectUserFeedback = exports.expectUserFeedback = function expectUserFeedback(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      servingTimeId = _ref3.servingTimeId,
      expectedRestaurant = _ref3.expectedRestaurant;

  expect(object.get('questionAndAnswers')).toEqual(expectedObject.get('questionAndAnswers'));
  expect(object.get('others')).toBe(expectedObject.get('others'));
  expect(object.get('submittedAt')).toBe(expectedObject.get('submittedAt'));
  expect(object.get('restaurantId')).toBe(expectedObject.get('restaurantId'));
  expect(object.get('addedByUserId')).toBe(expectedObject.get('addedByUserId'));

  if (servingTimeId) {
    expect(object.get('id')).toBe(servingTimeId);
  }

  if (expectedRestaurant) {
    expect(object.get('restaurantId')).toEqual(expectedRestaurant.get('id'));
  }
};

describe('constructor', function () {
  test('should set class name', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return createUserFeedback();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('UserFeedback');

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});

describe('static public methods', function () {
  test('spawn should set provided info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _ref6, servingTime, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createUserFeedbackInfo();

          case 2:
            _ref6 = _context4.sent;
            servingTime = _ref6.servingTime;
            _context4.next = 6;
            return createUserFeedback(servingTime);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectUserFeedback(info, servingTime);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('public methods', function () {
  test('getObject should return provided object', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var object;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return createUserFeedback();

          case 2:
            object = _context5.sent;


            expect(new _.UserFeedback(object).getObject()).toBe(object);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  test('getId should return provided object Id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var object;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return createUserFeedback();

          case 2:
            object = _context6.sent;


            expect(new _.UserFeedback(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var object, _ref10, updatedUserFeedback, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createUserFeedback();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createUserFeedbackInfo();

          case 5:
            _ref10 = _context7.sent;
            updatedUserFeedback = _ref10.servingTime;


            object.updateInfo(updatedUserFeedback);

            info = object.getInfo();


            expectUserFeedback(info, updatedUserFeedback);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _ref12, servingTime, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createUserFeedbackInfo();

          case 2:
            _ref12 = _context8.sent;
            servingTime = _ref12.servingTime;
            _context8.next = 6;
            return createUserFeedback(servingTime);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectUserFeedback(info, servingTime);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});