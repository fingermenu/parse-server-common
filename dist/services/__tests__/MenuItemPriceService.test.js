'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

require('../../../bootstrap');

var _TestHelper = require('../../../TestHelper');

var _TestHelper2 = _interopRequireDefault(_TestHelper);

var _2 = require('..');

var _MenuItemPrice = require('../../schema/__tests__/MenuItemPrice.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();
var menuItemPriceService = new _2.MenuItemPriceService();

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('currentPrice', 'wasPrice', 'validFrom', 'validUntil', 'menuItem', 'toBeServedWithMenuItemPrices', 'choiceItemPrices', 'defaultChoiceItemPrices', 'addedByUser', 'removedByUser', 'toBeServedWithMenuItemPriceSortOrderIndices', 'choiceItemPriceSortOrderIndices', 'tags', 'rules'),
    include_menuItem: true,
    include_addedByUser: true,
    include_removedByUser: true,
    include_tags: true
  });
};

var createCriteria = function createCriteria(object) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      currentPrice: object ? object.get('currentPrice') : chance.floating({ min: 0, max: 1000 }),
      wasPrice: object ? object.get('wasPrice') : chance.floating({ min: 0, max: 1000 }),
      validFrom: object ? object.get('validFrom') : new Date(),
      validUntil: object ? object.get('validUntil') : new Date(),
      menuItemId: object ? object.get('menuItemId') : chance.string(),
      toBeServedWithMenuItemPriceIds: object ? object.get('toBeServedWithMenuItemPriceIds') : (0, _immutable.List)(),
      choiceItemPriceIds: object ? object.get('choiceItemPriceIds') : _immutable.List.of(chance.string(), chance.string()),
      defaultChoiceItemPriceIds: object ? object.get('defaultChoiceItemPriceIds') : _immutable.List.of(chance.string(), chance.string()),
      addedByUserId: object ? object.get('addedByUserId') : chance.string(),
      removedByUserId: object ? object.get('removedByUserId') : chance.string(),
      toBeServedWithMenuItemPriceSortOrderIndices: object ? object.get('toBeServedWithMenuItemPriceSortOrderIndices') : _TestHelper2.default.createRandomMap(),
      choiceItemPriceSortOrderIndices: object ? object.get('choiceItemPriceSortOrderIndices') : _TestHelper2.default.createRandomMap(),
      tagIds: object ? object.get('tagIds') : _immutable.List.of(chance.string(), chance.string()),
      rules: object ? object.get('rules') : _TestHelper2.default.createRandomMap()
    })
  }).merge(createCriteriaWthoutConditions());
};

var createMenuItemPrices = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var createToBeServerWithMenuItemPrices = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var toBeServedWithMenuItemPrices, menuItemPrice, _ref2, tempMenuItemPrice;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!createToBeServerWithMenuItemPrices) {
              _context2.next = 6;
              break;
            }

            _context2.next = 3;
            return createMenuItemPrices(2, false, false);

          case 3:
            _context2.t0 = _context2.sent;
            _context2.next = 7;
            break;

          case 6:
            _context2.t0 = (0, _immutable.List)();

          case 7:
            toBeServedWithMenuItemPrices = _context2.t0;
            menuItemPrice = void 0;

            if (!useSameInfo) {
              _context2.next = 15;
              break;
            }

            _context2.next = 12;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 12:
            _ref2 = _context2.sent;
            tempMenuItemPrice = _ref2.menuItemPrice;


            menuItemPrice = tempMenuItemPrice;

          case 15:
            _context2.t1 = _immutable2.default;
            _context2.next = 18;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var finalMenuItemPrice, _ref4, _tempMenuItemPrice;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      finalMenuItemPrice = void 0;

                      if (!useSameInfo) {
                        _context.next = 5;
                        break;
                      }

                      finalMenuItemPrice = menuItemPrice;
                      _context.next = 10;
                      break;

                    case 5:
                      _context.next = 7;
                      return (0, _MenuItemPrice.createMenuItemPriceInfo)();

                    case 7:
                      _ref4 = _context.sent;
                      _tempMenuItemPrice = _ref4.menuItemPrice;


                      finalMenuItemPrice = _tempMenuItemPrice;

                    case 10:
                      _context.t0 = menuItemPriceService;
                      _context.next = 13;
                      return menuItemPriceService.create(createToBeServerWithMenuItemPrices ? finalMenuItemPrice.set('toBeServedWithMenuItemPriceIds', toBeServedWithMenuItemPrices.map(function (_) {
                        return _.get('id');
                      })) : finalMenuItemPrice);

                    case 13:
                      _context.t1 = _context.sent;
                      _context.t2 = createCriteriaWthoutConditions();
                      return _context.abrupt('return', _context.t0.read.call(_context.t0, _context.t1, _context.t2));

                    case 16:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }))).toArray());

          case 18:
            _context2.t2 = _context2.sent;
            return _context2.abrupt('return', _context2.t1.fromJS.call(_context2.t1, _context2.t2));

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createMenuItemPrices(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = createMenuItemPrices;


describe('create', function () {
  test('should return the created menu item price Id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var menuItemPriceId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = menuItemPriceService;
            _context3.next = 3;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 3:
            _context3.t1 = _context3.sent.menuItemPrice;
            _context3.next = 6;
            return _context3.t0.create.call(_context3.t0, _context3.t1);

          case 6:
            menuItemPriceId = _context3.sent;


            expect(menuItemPriceId).toBeDefined();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the menu item price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _ref7, menuItemPrice, menuItemPriceId, fetchedMenuItemPrice;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 2:
            _ref7 = _context4.sent;
            menuItemPrice = _ref7.menuItemPrice;
            _context4.next = 6;
            return menuItemPriceService.create(menuItemPrice);

          case 6:
            menuItemPriceId = _context4.sent;
            _context4.next = 9;
            return menuItemPriceService.read(menuItemPriceId, createCriteriaWthoutConditions());

          case 9:
            fetchedMenuItemPrice = _context4.sent;


            expect(fetchedMenuItemPrice).toBeDefined();

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided menu item price Id does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var menuItemPriceId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            menuItemPriceId = chance.string();
            _context5.prev = 1;
            _context5.next = 4;
            return menuItemPriceService.read(menuItemPriceId);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.message).toBe('No menu item price found with Id: ' + menuItemPriceId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should read the existing menu item price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var _ref10, expectedMenuItemPrice, expectedMenuItem, expectedChoiceItemPrices, expectedDefaultChoiceItemPrices, expectedAddedByUser, expectedRemovedByUser, expectedTags, menuItemPriceId, menuItemPrice;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.t0 = _MenuItemPrice.createMenuItemPriceInfo;
            _context6.next = 3;
            return createMenuItemPrices(2, false, false);

          case 3:
            _context6.t1 = function (_) {
              return _.get('id');
            };

            _context6.t2 = _context6.sent.map(_context6.t1);
            _context6.t3 = {
              toBeServedWithMenuItemPriceIds: _context6.t2
            };
            _context6.next = 8;
            return (0, _context6.t0)(_context6.t3);

          case 8:
            _ref10 = _context6.sent;
            expectedMenuItemPrice = _ref10.menuItemPrice;
            expectedMenuItem = _ref10.menuItem;
            expectedChoiceItemPrices = _ref10.choiceItemPrices;
            expectedDefaultChoiceItemPrices = _ref10.defaultChoiceItemPrices;
            expectedAddedByUser = _ref10.addedByUser;
            expectedRemovedByUser = _ref10.removedByUser;
            expectedTags = _ref10.tags;
            _context6.next = 18;
            return menuItemPriceService.create(expectedMenuItemPrice);

          case 18:
            menuItemPriceId = _context6.sent;
            _context6.next = 21;
            return menuItemPriceService.read(menuItemPriceId, createCriteriaWthoutConditions());

          case 21:
            menuItemPrice = _context6.sent;


            (0, _MenuItemPrice.expectMenuItemPrice)(menuItemPrice, expectedMenuItemPrice, {
              menuItemPriceId: menuItemPriceId,
              expectedMenuItem: expectedMenuItem,
              expectedChoiceItemPrices: expectedChoiceItemPrices,
              expectedDefaultChoiceItemPrices: expectedDefaultChoiceItemPrices,
              expectedAddedByUser: expectedAddedByUser,
              expectedRemovedByUser: expectedRemovedByUser,
              expectedTags: expectedTags
            });

          case 23:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided menu item price Id does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var menuItemPriceId, menuItemPrice;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            menuItemPriceId = chance.string();
            _context7.prev = 1;
            _context7.t0 = menuItemPriceService;
            _context7.t1 = menuItemPriceService;
            _context7.next = 6;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 6:
            _context7.t2 = _context7.sent.menuItemPrice;
            _context7.next = 9;
            return _context7.t1.create.call(_context7.t1, _context7.t2);

          case 9:
            _context7.t3 = _context7.sent;
            _context7.t4 = createCriteriaWthoutConditions();
            _context7.next = 13;
            return _context7.t0.read.call(_context7.t0, _context7.t3, _context7.t4);

          case 13:
            menuItemPrice = _context7.sent;
            _context7.next = 16;
            return menuItemPriceService.update(menuItemPrice.set('id', menuItemPriceId));

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t5 = _context7['catch'](1);

            expect(_context7.t5.message).toBe('No menu item price found with Id: ' + menuItemPriceId);

          case 21:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated menu item price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _ref13, expectedMenuItemPrice, menuItemPriceId, id;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 2:
            _ref13 = _context8.sent;
            expectedMenuItemPrice = _ref13.menuItemPrice;
            _context8.t0 = menuItemPriceService;
            _context8.next = 7;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 7:
            _context8.t1 = _context8.sent.menuItemPrice;
            _context8.next = 10;
            return _context8.t0.create.call(_context8.t0, _context8.t1);

          case 10:
            menuItemPriceId = _context8.sent;
            _context8.next = 13;
            return menuItemPriceService.update(expectedMenuItemPrice.set('id', menuItemPriceId));

          case 13:
            id = _context8.sent;


            expect(id).toBe(menuItemPriceId);

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing menu item price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var _ref15, expectedMenuItemPrice, expectedMenuItem, expectedChoiceItemPrices, expectedDefaultChoiceItemPrices, expectedAddedByUser, expectedRemovedByUser, expectedTags, menuItemPriceId, menuItemPrice;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.t0 = _MenuItemPrice.createMenuItemPriceInfo;
            _context9.next = 3;
            return createMenuItemPrices(2, false, false);

          case 3:
            _context9.t1 = function (_) {
              return _.get('id');
            };

            _context9.t2 = _context9.sent.map(_context9.t1);
            _context9.t3 = {
              toBeServedWithMenuItemPriceIds: _context9.t2
            };
            _context9.next = 8;
            return (0, _context9.t0)(_context9.t3);

          case 8:
            _ref15 = _context9.sent;
            expectedMenuItemPrice = _ref15.menuItemPrice;
            expectedMenuItem = _ref15.menuItem;
            expectedChoiceItemPrices = _ref15.choiceItemPrices;
            expectedDefaultChoiceItemPrices = _ref15.defaultChoiceItemPrices;
            expectedAddedByUser = _ref15.addedByUser;
            expectedRemovedByUser = _ref15.removedByUser;
            expectedTags = _ref15.tags;
            _context9.t4 = menuItemPriceService;
            _context9.next = 19;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 19:
            _context9.t5 = _context9.sent.menuItemPrice;
            _context9.next = 22;
            return _context9.t4.create.call(_context9.t4, _context9.t5);

          case 22:
            menuItemPriceId = _context9.sent;
            _context9.next = 25;
            return menuItemPriceService.update(expectedMenuItemPrice.set('id', menuItemPriceId));

          case 25:
            _context9.next = 27;
            return menuItemPriceService.read(menuItemPriceId, createCriteriaWthoutConditions());

          case 27:
            menuItemPrice = _context9.sent;


            (0, _MenuItemPrice.expectMenuItemPrice)(menuItemPrice, expectedMenuItemPrice, {
              menuItemPriceId: menuItemPriceId,
              expectedMenuItem: expectedMenuItem,
              expectedChoiceItemPrices: expectedChoiceItemPrices,
              expectedDefaultChoiceItemPrices: expectedDefaultChoiceItemPrices,
              expectedAddedByUser: expectedAddedByUser,
              expectedRemovedByUser: expectedRemovedByUser,
              expectedTags: expectedTags
            });

          case 29:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided menu item price Id does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var menuItemPriceId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            menuItemPriceId = chance.string();
            _context10.prev = 1;
            _context10.next = 4;
            return menuItemPriceService.delete(menuItemPriceId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.message).toBe('No menu item price found with Id: ' + menuItemPriceId);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 6]]);
  })));

  test('should delete the existing menu item price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var menuItemPriceId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = menuItemPriceService;
            _context11.next = 3;
            return (0, _MenuItemPrice.createMenuItemPriceInfo)();

          case 3:
            _context11.t1 = _context11.sent.menuItemPrice;
            _context11.next = 6;
            return _context11.t0.create.call(_context11.t0, _context11.t1);

          case 6:
            menuItemPriceId = _context11.sent;
            _context11.next = 9;
            return menuItemPriceService.delete(menuItemPriceId);

          case 9:
            _context11.prev = 9;
            _context11.next = 12;
            return menuItemPriceService.delete(menuItemPriceId);

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t2 = _context11['catch'](9);

            expect(_context11.t2.message).toBe('No menu item price found with Id: ' + menuItemPriceId);

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no menu item price if provided criteria matches no menu item price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var menuItemPrices;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return menuItemPriceService.search(createCriteria());

          case 2:
            menuItemPrices = _context12.sent;


            expect(menuItemPrices.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the menu item price matches the criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var _ref20, expectedMenuItemPrice, expectedMenuItem, expectedChoiceItemPrices, expectedDefaultChoiceItemPrices, expectedAddedByUser, expectedRemovedByUser, expectedTags, results, menuItemPrices;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.t0 = _MenuItemPrice.createMenuItemPriceInfo;
            _context14.next = 3;
            return createMenuItemPrices(2, false, false);

          case 3:
            _context14.t1 = function (_) {
              return _.get('id');
            };

            _context14.t2 = _context14.sent.map(_context14.t1);
            _context14.t3 = {
              toBeServedWithMenuItemPriceIds: _context14.t2
            };
            _context14.next = 8;
            return (0, _context14.t0)(_context14.t3);

          case 8:
            _ref20 = _context14.sent;
            expectedMenuItemPrice = _ref20.menuItemPrice;
            expectedMenuItem = _ref20.menuItem;
            expectedChoiceItemPrices = _ref20.choiceItemPrices;
            expectedDefaultChoiceItemPrices = _ref20.defaultChoiceItemPrices;
            expectedAddedByUser = _ref20.addedByUser;
            expectedRemovedByUser = _ref20.removedByUser;
            expectedTags = _ref20.tags;
            _context14.t4 = _immutable2.default;
            _context14.next = 19;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 1, max: 10 })).map(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', menuItemPriceService.create(expectedMenuItemPrice));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            }))).toArray());

          case 19:
            _context14.t5 = _context14.sent;
            results = _context14.t4.fromJS.call(_context14.t4, _context14.t5);
            _context14.next = 23;
            return menuItemPriceService.search(createCriteria(expectedMenuItemPrice));

          case 23:
            menuItemPrices = _context14.sent;


            expect(menuItemPrices.count).toBe(results.count);
            menuItemPrices.forEach(function (menuItemPrice) {
              expect(results.find(function (_) {
                return _.localeCompare(menuItemPrice.get('id')) === 0;
              })).toBeDefined();
              (0, _MenuItemPrice.expectMenuItemPrice)(menuItemPrice, expectedMenuItemPrice, {
                menuItemPriceId: menuItemPrice.get('id'),
                expectedMenuItem: expectedMenuItem,
                expectedChoiceItemPrices: expectedChoiceItemPrices,
                expectedDefaultChoiceItemPrices: expectedDefaultChoiceItemPrices,
                expectedAddedByUser: expectedAddedByUser,
                expectedRemovedByUser: expectedRemovedByUser,
                expectedTags: expectedTags
              });
            });

          case 26:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no menu item price if provided criteria matches no menu item price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var menuItemPrices, result;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            menuItemPrices = (0, _immutable.List)();
            result = menuItemPriceService.searchAll(createCriteria());
            _context15.prev = 2;

            result.event.subscribe(function (info) {
              menuItemPrices = menuItemPrices.push(info);
            });

            _context15.next = 6;
            return result.promise;

          case 6:
            _context15.prev = 6;

            result.event.unsubscribeAll();
            return _context15.finish(6);

          case 9:

            expect(menuItemPrices.count()).toBe(0);

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[2,, 6, 9]]);
  })));

  test('should return the menu item price matches the criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
    var _ref24, expectedMenuItemPrice, expectedMenuItem, expectedChoiceItemPrices, expectedDefaultChoiceItemPrices, expectedAddedByUser, expectedRemovedByUser, expectedTags, results, menuItemPrices, result;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.t0 = _MenuItemPrice.createMenuItemPriceInfo;
            _context17.next = 3;
            return createMenuItemPrices(2, false, false);

          case 3:
            _context17.t1 = function (_) {
              return _.get('id');
            };

            _context17.t2 = _context17.sent.map(_context17.t1);
            _context17.t3 = {
              toBeServedWithMenuItemPriceIds: _context17.t2
            };
            _context17.next = 8;
            return (0, _context17.t0)(_context17.t3);

          case 8:
            _ref24 = _context17.sent;
            expectedMenuItemPrice = _ref24.menuItemPrice;
            expectedMenuItem = _ref24.menuItem;
            expectedChoiceItemPrices = _ref24.choiceItemPrices;
            expectedDefaultChoiceItemPrices = _ref24.defaultChoiceItemPrices;
            expectedAddedByUser = _ref24.addedByUser;
            expectedRemovedByUser = _ref24.removedByUser;
            expectedTags = _ref24.tags;
            _context17.t4 = _immutable2.default;
            _context17.next = 19;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt('return', menuItemPriceService.create(expectedMenuItemPrice));

                    case 1:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            }))).toArray());

          case 19:
            _context17.t5 = _context17.sent;
            results = _context17.t4.fromJS.call(_context17.t4, _context17.t5);
            menuItemPrices = (0, _immutable.List)();
            result = menuItemPriceService.searchAll(createCriteria(expectedMenuItemPrice));
            _context17.prev = 23;

            result.event.subscribe(function (info) {
              menuItemPrices = menuItemPrices.push(info);
            });

            _context17.next = 27;
            return result.promise;

          case 27:
            _context17.prev = 27;

            result.event.unsubscribeAll();
            return _context17.finish(27);

          case 30:

            expect(menuItemPrices.count).toBe(results.count);
            menuItemPrices.forEach(function (menuItemPrice) {
              expect(results.find(function (_) {
                return _.localeCompare(menuItemPrice.get('id')) === 0;
              })).toBeDefined();
              (0, _MenuItemPrice.expectMenuItemPrice)(menuItemPrice, expectedMenuItemPrice, {
                menuItemPriceId: menuItemPrice.get('id'),
                expectedMenuItem: expectedMenuItem,
                expectedChoiceItemPrices: expectedChoiceItemPrices,
                expectedDefaultChoiceItemPrices: expectedDefaultChoiceItemPrices,
                expectedAddedByUser: expectedAddedByUser,
                expectedRemovedByUser: expectedRemovedByUser,
                expectedTags: expectedTags
              });
            });

          case 32:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[23,, 27, 30]]);
  })));
});

describe('exists', function () {
  test('should return false if no menu item price match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = expect;
            _context18.next = 3;
            return menuItemPriceService.exists(createCriteria());

          case 3:
            _context18.t1 = _context18.sent;
            (0, _context18.t0)(_context18.t1).toBeFalsy();

          case 5:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  })));

  test('should return true if any menu item price match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
    var menuItemPrices;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return createMenuItemPrices(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            menuItemPrices = _context19.sent;
            _context19.t0 = expect;
            _context19.next = 6;
            return menuItemPriceService.exists(createCriteria(menuItemPrices.first()));

          case 6:
            _context19.t1 = _context19.sent;
            (0, _context19.t0)(_context19.t1).toBeTruthy();

          case 8:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no menu item price match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return menuItemPriceService.count(createCriteria());

          case 3:
            _context20.t1 = _context20.sent;
            (0, _context20.t0)(_context20.t1).toBe(0);

          case 5:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  })));

  test('should return the count of menu item price match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
    var menuItemPrices;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return createMenuItemPrices(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            menuItemPrices = _context21.sent;
            _context21.t0 = expect;
            _context21.next = 6;
            return menuItemPriceService.count(createCriteria(menuItemPrices.first()));

          case 6:
            _context21.t1 = _context21.sent;
            _context21.t2 = menuItemPrices.count();
            (0, _context21.t0)(_context21.t1).toBe(_context21.t2);

          case 9:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));
});