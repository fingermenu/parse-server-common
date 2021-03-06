'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectDepartmentCategory = exports.createDepartmentCategory = exports.createDepartmentCategoryInfo = undefined;

var _immutable = require('immutable');

var _TestHelper = require('../../../TestHelper');

var _TestHelper2 = _interopRequireDefault(_TestHelper);

var _ = require('..');

var _TagService = require('../../services/__tests__/TagService.test');

var _TagService2 = _interopRequireDefault(_TagService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createDepartmentCategoryInfo = exports.createDepartmentCategoryInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var tag, ownedByUser, maintainedByUsers, departmentCategory;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _TagService2.default)(1);

          case 2:
            tag = _context.sent.first();
            _context.next = 5;
            return _TestHelper2.default.createUser();

          case 5:
            ownedByUser = _context.sent;
            _context.next = 8;
            return _TestHelper2.default.createUsers();

          case 8:
            maintainedByUsers = _context.sent;
            departmentCategory = (0, _immutable.Map)({
              tagId: tag.get('id'),
              ownedByUserId: ownedByUser.id,
              maintainedByUserIds: maintainedByUsers.map(function (maintainedByUser) {
                return maintainedByUser.id;
              })
            });
            return _context.abrupt('return', {
              departmentCategory: departmentCategory,
              tag: tag,
              ownedByUser: ownedByUser,
              maintainedByUsers: maintainedByUsers
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createDepartmentCategoryInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createDepartmentCategory = exports.createDepartmentCategory = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _.DepartmentCategory;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createDepartmentCategoryInfo();

          case 5:
            _context2.t1 = _context2.sent.departmentCategory;

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

  return function createDepartmentCategory(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var expectDepartmentCategory = exports.expectDepartmentCategory = function expectDepartmentCategory(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      departmentCategoryId = _ref3.departmentCategoryId,
      expectedTag = _ref3.expectedTag;

  expect(object.get('tagId')).toBe(expectedObject.get('tagId'));
  expect(object.get('ownedByUserId')).toBe(expectedObject.get('ownedByUserId'));
  expect(object.get('maintainedByUserIds')).toEqual(expectedObject.get('maintainedByUserIds'));

  if (departmentCategoryId) {
    expect(object.get('id')).toBe(departmentCategoryId);
  }

  if (expectedTag) {
    expect(object.get('tagId')).toEqual(expectedTag.get('id'));
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
            return createDepartmentCategory();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('DepartmentCategory');

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
    var _ref6, departmentCategory, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createDepartmentCategoryInfo();

          case 2:
            _ref6 = _context4.sent;
            departmentCategory = _ref6.departmentCategory;
            _context4.next = 6;
            return createDepartmentCategory(departmentCategory);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectDepartmentCategory(info, departmentCategory);

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
            return createDepartmentCategory();

          case 2:
            object = _context5.sent;


            expect(new _.DepartmentCategory(object).getObject()).toBe(object);

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
            return createDepartmentCategory();

          case 2:
            object = _context6.sent;


            expect(new _.DepartmentCategory(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var object, _ref10, updatedDepartmentCategory, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createDepartmentCategory();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createDepartmentCategoryInfo();

          case 5:
            _ref10 = _context7.sent;
            updatedDepartmentCategory = _ref10.departmentCategory;


            object.updateInfo(updatedDepartmentCategory);

            info = object.getInfo();


            expectDepartmentCategory(info, updatedDepartmentCategory);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _ref12, departmentCategory, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createDepartmentCategoryInfo();

          case 2:
            _ref12 = _context8.sent;
            departmentCategory = _ref12.departmentCategory;
            _context8.next = 6;
            return createDepartmentCategory(departmentCategory);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectDepartmentCategory(info, departmentCategory);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});