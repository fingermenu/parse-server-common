'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

require('../../../bootstrap');

var _2 = require('..');

var _RequestLog = require('../../schema/__tests__/RequestLog.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();
var requestLogService = new _2.RequestLogService();

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('appVersion', 'requestType', 'user'),
    include_user: true
  });
};

var createCriteria = function createCriteria(object) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      appVersion: object ? object.get('appVersion') : chance.string(),
      requestType: object ? object.get('requestType') : chance.string(),
      userId: object ? object.get('userId') : chance.string()
    })
  });
};

var createRequestLogs = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var requestLog, _ref2, tempRequestLog;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            requestLog = void 0;

            if (!useSameInfo) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return (0, _RequestLog.createRequestLogInfo)();

          case 4:
            _ref2 = _context2.sent;
            tempRequestLog = _ref2.requestLog;


            requestLog = tempRequestLog;

          case 7:
            _context2.t0 = _immutable2.default;
            _context2.next = 10;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var finalRequestLog, _ref4, _tempRequestLog;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      finalRequestLog = void 0;

                      if (!useSameInfo) {
                        _context.next = 5;
                        break;
                      }

                      finalRequestLog = requestLog;
                      _context.next = 10;
                      break;

                    case 5:
                      _context.next = 7;
                      return (0, _RequestLog.createRequestLogInfo)();

                    case 7:
                      _ref4 = _context.sent;
                      _tempRequestLog = _ref4.requestLog;


                      finalRequestLog = _tempRequestLog;

                    case 10:
                      _context.t0 = requestLogService;
                      _context.next = 13;
                      return requestLogService.create(finalRequestLog);

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

          case 10:
            _context2.t1 = _context2.sent;
            return _context2.abrupt('return', _context2.t0.fromJS.call(_context2.t0, _context2.t1));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createRequestLogs(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = createRequestLogs;


describe('create', function () {
  test('should return the created request log Id', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var requestLogId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = requestLogService;
            _context3.next = 3;
            return (0, _RequestLog.createRequestLogInfo)();

          case 3:
            _context3.t1 = _context3.sent.requestLog;
            _context3.next = 6;
            return _context3.t0.create.call(_context3.t0, _context3.t1);

          case 6:
            requestLogId = _context3.sent;


            expect(requestLogId).toBeDefined();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the requestLog', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _ref7, requestLog, requestLogId, fetchedRequestLog;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _RequestLog.createRequestLogInfo)();

          case 2:
            _ref7 = _context4.sent;
            requestLog = _ref7.requestLog;
            _context4.next = 6;
            return requestLogService.create(requestLog);

          case 6:
            requestLogId = _context4.sent;
            _context4.next = 9;
            return requestLogService.read(requestLogId, createCriteriaWthoutConditions());

          case 9:
            fetchedRequestLog = _context4.sent;


            expect(fetchedRequestLog).toBeDefined();

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided request log Id does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var requestLogId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            requestLogId = chance.string();
            _context5.prev = 1;
            _context5.next = 4;
            return requestLogService.read(requestLogId);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.message).toBe('No request log found with Id: ' + requestLogId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should read the existing requestLog', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var _ref10, parentRequestLog, parentRequestLogId, _ref11, expectedRequestLog, expectedOwnedByUser, requestLogId, requestLog;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _RequestLog.createRequestLogInfo)();

          case 2:
            _ref10 = _context6.sent;
            parentRequestLog = _ref10.requestLog;
            _context6.next = 6;
            return requestLogService.create(parentRequestLog);

          case 6:
            parentRequestLogId = _context6.sent;
            _context6.next = 9;
            return (0, _RequestLog.createRequestLogInfo)({ parentRequestLogId: parentRequestLogId });

          case 9:
            _ref11 = _context6.sent;
            expectedRequestLog = _ref11.requestLog;
            expectedOwnedByUser = _ref11.user;
            _context6.next = 14;
            return requestLogService.create(expectedRequestLog);

          case 14:
            requestLogId = _context6.sent;
            _context6.next = 17;
            return requestLogService.read(requestLogId, createCriteriaWthoutConditions());

          case 17:
            requestLog = _context6.sent;


            (0, _RequestLog.expectRequestLog)(requestLog, expectedRequestLog, {
              expectedOwnedByUser: expectedOwnedByUser
            });

          case 19:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided request log Id does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var requestLogId, requestLog;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            requestLogId = chance.string();
            _context7.prev = 1;
            _context7.t0 = requestLogService;
            _context7.t1 = requestLogService;
            _context7.next = 6;
            return (0, _RequestLog.createRequestLogInfo)();

          case 6:
            _context7.t2 = _context7.sent.requestLog;
            _context7.next = 9;
            return _context7.t1.create.call(_context7.t1, _context7.t2);

          case 9:
            _context7.t3 = _context7.sent;
            _context7.t4 = createCriteriaWthoutConditions();
            _context7.next = 13;
            return _context7.t0.read.call(_context7.t0, _context7.t3, _context7.t4);

          case 13:
            requestLog = _context7.sent;
            _context7.next = 16;
            return requestLogService.update(requestLog.set('id', requestLogId));

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t5 = _context7['catch'](1);

            expect(_context7.t5.message).toBe('No request log found with Id: ' + requestLogId);

          case 21:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated requestLog', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _ref14, expectedRequestLog, requestLogId, id;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _RequestLog.createRequestLogInfo)();

          case 2:
            _ref14 = _context8.sent;
            expectedRequestLog = _ref14.requestLog;
            _context8.t0 = requestLogService;
            _context8.next = 7;
            return (0, _RequestLog.createRequestLogInfo)();

          case 7:
            _context8.t1 = _context8.sent.requestLog;
            _context8.next = 10;
            return _context8.t0.create.call(_context8.t0, _context8.t1);

          case 10:
            requestLogId = _context8.sent;
            _context8.next = 13;
            return requestLogService.update(expectedRequestLog.set('id', requestLogId));

          case 13:
            id = _context8.sent;


            expect(id).toBe(requestLogId);

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing requestLog', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var _ref16, parentRequestLog, parentRequestLogId, _ref17, expectedRequestLog, expectedOwnedByUser, requestLogId, requestLog;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _RequestLog.createRequestLogInfo)();

          case 2:
            _ref16 = _context9.sent;
            parentRequestLog = _ref16.requestLog;
            _context9.next = 6;
            return requestLogService.create(parentRequestLog);

          case 6:
            parentRequestLogId = _context9.sent;
            _context9.next = 9;
            return (0, _RequestLog.createRequestLogInfo)({ parentRequestLogId: parentRequestLogId });

          case 9:
            _ref17 = _context9.sent;
            expectedRequestLog = _ref17.requestLog;
            expectedOwnedByUser = _ref17.user;
            _context9.t0 = requestLogService;
            _context9.next = 15;
            return (0, _RequestLog.createRequestLogInfo)();

          case 15:
            _context9.t1 = _context9.sent.requestLog;
            _context9.next = 18;
            return _context9.t0.create.call(_context9.t0, _context9.t1);

          case 18:
            requestLogId = _context9.sent;
            _context9.next = 21;
            return requestLogService.update(expectedRequestLog.set('id', requestLogId));

          case 21:
            _context9.next = 23;
            return requestLogService.read(requestLogId, createCriteriaWthoutConditions());

          case 23:
            requestLog = _context9.sent;


            (0, _RequestLog.expectRequestLog)(requestLog, expectedRequestLog, { expectedOwnedByUser: expectedOwnedByUser });

          case 25:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided request log Id does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var requestLogId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            requestLogId = chance.string();
            _context10.prev = 1;
            _context10.next = 4;
            return requestLogService.delete(requestLogId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.message).toBe('No request log found with Id: ' + requestLogId);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 6]]);
  })));

  test('should delete the existing requestLog', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var requestLogId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = requestLogService;
            _context11.next = 3;
            return (0, _RequestLog.createRequestLogInfo)();

          case 3:
            _context11.t1 = _context11.sent.requestLog;
            _context11.next = 6;
            return _context11.t0.create.call(_context11.t0, _context11.t1);

          case 6:
            requestLogId = _context11.sent;
            _context11.next = 9;
            return requestLogService.delete(requestLogId);

          case 9:
            _context11.prev = 9;
            _context11.next = 12;
            return requestLogService.delete(requestLogId);

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t2 = _context11['catch'](9);

            expect(_context11.t2.message).toBe('No request log found with Id: ' + requestLogId);

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no request log if provided criteria matches no requestLog', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var requestLogs;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return requestLogService.search(createCriteria());

          case 2:
            requestLogs = _context12.sent;


            expect(requestLogs.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the request log matches the criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var _ref22, parentRequestLog, parentRequestLogId, _ref23, expectedRequestLog, expectedOwnedByUser, results, requestLogs;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _RequestLog.createRequestLogInfo)();

          case 2:
            _ref22 = _context14.sent;
            parentRequestLog = _ref22.requestLog;
            _context14.next = 6;
            return requestLogService.create(parentRequestLog);

          case 6:
            parentRequestLogId = _context14.sent;
            _context14.next = 9;
            return (0, _RequestLog.createRequestLogInfo)({ parentRequestLogId: parentRequestLogId });

          case 9:
            _ref23 = _context14.sent;
            expectedRequestLog = _ref23.requestLog;
            expectedOwnedByUser = _ref23.user;
            _context14.t0 = _immutable2.default;
            _context14.next = 15;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', requestLogService.create(expectedRequestLog));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            }))).toArray());

          case 15:
            _context14.t1 = _context14.sent;
            results = _context14.t0.fromJS.call(_context14.t0, _context14.t1);
            _context14.next = 19;
            return requestLogService.search(createCriteria(expectedRequestLog));

          case 19:
            requestLogs = _context14.sent;


            expect(requestLogs.count).toBe(results.count);
            requestLogs.forEach(function (requestLog) {
              expect(results.find(function (_) {
                return _.localeCompare(requestLog.get('id')) === 0;
              })).toBeDefined();
              (0, _RequestLog.expectRequestLog)(requestLog, expectedRequestLog, { expectedOwnedByUser: expectedOwnedByUser });
            });

          case 22:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no request log if provided criteria matches no requestLog', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var requestLogs, result;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            requestLogs = (0, _immutable.List)();
            result = requestLogService.searchAll(createCriteria());
            _context15.prev = 2;

            result.event.subscribe(function (info) {
              requestLogs = requestLogs.push(info);
            });

            _context15.next = 6;
            return result.promise;

          case 6:
            _context15.prev = 6;

            result.event.unsubscribeAll();
            return _context15.finish(6);

          case 9:

            expect(requestLogs.count()).toBe(0);

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[2,, 6, 9]]);
  })));

  test('should return the request log matches the criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
    var _ref27, parentRequestLog, parentRequestLogId, _ref28, expectedRequestLog, expectedOwnedByUser, results, requestLogs, result;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _RequestLog.createRequestLogInfo)();

          case 2:
            _ref27 = _context17.sent;
            parentRequestLog = _ref27.requestLog;
            _context17.next = 6;
            return requestLogService.create(parentRequestLog);

          case 6:
            parentRequestLogId = _context17.sent;
            _context17.next = 9;
            return (0, _RequestLog.createRequestLogInfo)({ parentRequestLogId: parentRequestLogId });

          case 9:
            _ref28 = _context17.sent;
            expectedRequestLog = _ref28.requestLog;
            expectedOwnedByUser = _ref28.user;
            _context17.t0 = _immutable2.default;
            _context17.next = 15;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt('return', requestLogService.create(expectedRequestLog));

                    case 1:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            }))).toArray());

          case 15:
            _context17.t1 = _context17.sent;
            results = _context17.t0.fromJS.call(_context17.t0, _context17.t1);
            requestLogs = (0, _immutable.List)();
            result = requestLogService.searchAll(createCriteria(expectedRequestLog));
            _context17.prev = 19;

            result.event.subscribe(function (info) {
              requestLogs = requestLogs.push(info);
            });

            _context17.next = 23;
            return result.promise;

          case 23:
            _context17.prev = 23;

            result.event.unsubscribeAll();
            return _context17.finish(23);

          case 26:

            expect(requestLogs.count).toBe(results.count);
            requestLogs.forEach(function (requestLog) {
              expect(results.find(function (_) {
                return _.localeCompare(requestLog.get('id')) === 0;
              })).toBeDefined();
              (0, _RequestLog.expectRequestLog)(requestLog, expectedRequestLog, { expectedOwnedByUser: expectedOwnedByUser });
            });

          case 28:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[19,, 23, 26]]);
  })));
});

describe('exists', function () {
  test('should return false if no request log match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = expect;
            _context18.next = 3;
            return requestLogService.exists(createCriteria());

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

  test('should return true if any request log match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
    var requestLogs;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return createRequestLogs(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            requestLogs = _context19.sent;
            _context19.t0 = expect;
            _context19.next = 6;
            return requestLogService.exists(createCriteria(requestLogs.first()));

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
  test('should return 0 if no request log match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return requestLogService.count(createCriteria());

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

  test('should return the count of request log match provided criteria', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
    var requestLogs;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return createRequestLogs(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            requestLogs = _context21.sent;
            _context21.t0 = expect;
            _context21.next = 6;
            return requestLogService.count(createCriteria(requestLogs.first()));

          case 6:
            _context21.t1 = _context21.sent;
            _context21.t2 = requestLogs.count();
            (0, _context21.t0)(_context21.t1).toBe(_context21.t2);

          case 9:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));
});