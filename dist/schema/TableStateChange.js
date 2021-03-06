'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _immutable = require('immutable');

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableState = require('./TableState');

var _TableState2 = _interopRequireDefault(_TableState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableStateChange = function (_BaseObject) {
  _inherits(TableStateChange, _BaseObject);

  function TableStateChange(object) {
    _classCallCheck(this, TableStateChange);

    var _this = _possibleConstructorReturn(this, (TableStateChange.__proto__ || Object.getPrototypeOf(TableStateChange)).call(this, object, 'TableStateChange'));

    _initialiseProps.call(_this);

    return _this;
  }

  return TableStateChange;
}(_parseServerCommon.BaseObject);

TableStateChange.spawn = function (info) {
  var object = new TableStateChange();

  TableStateChange.updateInfoInternal(object, info);

  return object;
};

TableStateChange.updateInfoInternal = function (object, info) {
  _parseServerCommon.BaseObject.createPointer(object, info, 'tableState', _TableState2.default);
  _parseServerCommon.BaseObject.createPointer(object, info, 'table', _Table2.default);
  _parseServerCommon.BaseObject.createUserPointer(object, info, 'changedByUser');
  object.set('numberOfAdults', info.get('numberOfAdults'));
  object.set('numberOfChildren', info.get('numberOfChildren'));
  _parseServerCommon.BaseObject.createStringColumn(object, info, 'customerName');
  _parseServerCommon.BaseObject.createStringColumn(object, info, 'notes');
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    TableStateChange.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var tableState = object.get('tableState');
    var table = object.get('table');
    var changedByUser = object.get('changedByUser');

    return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
      id: _this2.getId(),
      createdAt: object.get('createdAt'),
      updatedAt: object.get('updatedAt'),
      tableState: tableState,
      tableStateId: tableState ? tableState.id : undefined,
      table: table,
      tableId: table ? table.id : undefined,
      changedByUser: changedByUser,
      changedByUserId: changedByUser ? changedByUser.id : undefined,
      numberOfAdults: object.get('numberOfAdults'),
      numberOfChildren: object.get('numberOfChildren'),
      customerName: object.get('customerName'),
      notes: object.get('notes')
    }));
  };
};

exports.default = TableStateChange;