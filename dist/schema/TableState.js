'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableState = function (_BaseObject) {
  _inherits(TableState, _BaseObject);

  function TableState(object) {
    _classCallCheck(this, TableState);

    var _this = _possibleConstructorReturn(this, (TableState.__proto__ || Object.getPrototypeOf(TableState)).call(this, object, 'TableState'));

    _initialiseProps.call(_this);

    return _this;
  }

  return TableState;
}(_parseServerCommon.BaseObject);

TableState.spawn = function (info) {
  var object = new TableState();

  TableState.updateInfoInternal(object, info);

  return object;
};

TableState.updateInfoInternal = function (object, info) {
  object.set('key', info.get('key'));
  _parseServerCommon.BaseObject.createMultiLanguagesStringColumn(object, info, 'name');
  object.set('imageUrl', info.get('imageUrl'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    TableState.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();

    return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
      id: _this2.getId(),
      createdAt: object.get('createdAt'),
      updatedAt: object.get('updatedAt'),
      key: object.get('key'),
      name: _this2.getMultiLanguagesString('name'),
      imageUrl: object.get('imageUrl')
    }));
  };
};

exports.default = TableState;