'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectPackageBundle = exports.createPackageBundle = exports.createPackageBundleInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

require('../../../bootstrap');

var _ = require('..');

var _RestaurantService = require('../../services/__tests__/RestaurantService.test');

var _RestaurantService2 = _interopRequireDefault(_RestaurantService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();

var createPackageBundleInfo = exports.createPackageBundleInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var restaurant, packageBundle;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _RestaurantService2.default)(1);

          case 2:
            restaurant = _context.sent.first();
            packageBundle = (0, _immutable.Map)({
              url: chance.string(),
              checksum: chance.string(),
              restaurantId: restaurant.get('id')
            });
            return _context.abrupt('return', {
              packageBundle: packageBundle,
              restaurant: restaurant
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createPackageBundleInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createPackageBundle = exports.createPackageBundle = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _.PackageBundle;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createPackageBundleInfo();

          case 5:
            _context2.t1 = _context2.sent.packageBundle;

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

  return function createPackageBundle(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var expectPackageBundle = exports.expectPackageBundle = function expectPackageBundle(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      packageBundleId = _ref3.packageBundleId,
      expectedRestaurant = _ref3.expectedRestaurant;

  expect(object.get('url')).toBe(expectedObject.get('url'));
  expect(object.get('checksum')).toBe(expectedObject.get('checksum'));
  expect(object.get('restaurantId')).toBe(expectedObject.get('restaurantId'));

  if (packageBundleId) {
    expect(object.get('id')).toBe(packageBundleId);
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
            return createPackageBundle();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('PackageBundle');

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
    var _ref6, packageBundle, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createPackageBundleInfo();

          case 2:
            _ref6 = _context4.sent;
            packageBundle = _ref6.packageBundle;
            _context4.next = 6;
            return createPackageBundle(packageBundle);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectPackageBundle(info, packageBundle);

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
            return createPackageBundle();

          case 2:
            object = _context5.sent;


            expect(new _.PackageBundle(object).getObject()).toBe(object);

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
            return createPackageBundle();

          case 2:
            object = _context6.sent;


            expect(new _.PackageBundle(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var object, _ref10, updatedPackageBundle, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createPackageBundle();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createPackageBundleInfo();

          case 5:
            _ref10 = _context7.sent;
            updatedPackageBundle = _ref10.packageBundle;


            object.updateInfo(updatedPackageBundle);

            info = object.getInfo();


            expectPackageBundle(info, updatedPackageBundle);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _ref12, packageBundle, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createPackageBundleInfo();

          case 2:
            _ref12 = _context8.sent;
            packageBundle = _ref12.packageBundle;
            _context8.next = 6;
            return createPackageBundle(packageBundle);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectPackageBundle(info, packageBundle);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});