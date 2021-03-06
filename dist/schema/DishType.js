'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DishType = function (_BaseObject) {
  _inherits(DishType, _BaseObject);

  function DishType(object) {
    _classCallCheck(this, DishType);

    var _this = _possibleConstructorReturn(this, (DishType.__proto__ || Object.getPrototypeOf(DishType)).call(this, object, 'DishType'));

    _initialiseProps.call(_this);

    return _this;
  }

  return DishType;
}(_parseServerCommon.BaseObject);

DishType.spawn = function (info) {
  var object = new DishType();

  DishType.updateInfoInternal(object, info);

  return object;
};

DishType.updateInfoInternal = function (object, info) {
  _parseServerCommon.BaseObject.createPointer(object, info, 'tag', _Tag2.default);
  _parseServerCommon.BaseObject.createUserPointer(object, info, 'ownedByUser');
  _parseServerCommon.BaseObject.createUserArrayPointer(object, info, 'maintainedByUser');
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    DishType.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var tag = object.get('tag');
    var ownedByUser = object.get('ownedByUser');
    var maintainedByUsers = _immutable2.default.fromJS(object.get('maintainedByUsers'));

    return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
      id: _this2.getId(),
      createdAt: object.get('createdAt'),
      updatedAt: object.get('updatedAt'),
      tag: tag,
      tagId: tag ? tag.id : undefined,
      ownedByUser: ownedByUser,
      ownedByUserId: ownedByUser ? ownedByUser.id : undefined,
      maintainedByUsers: maintainedByUsers,
      maintainedByUserIds: maintainedByUsers ? maintainedByUsers.map(function (maintainedByUser) {
        return maintainedByUser.id;
      }) : (0, _immutable.List)()
    }));
  };
};

exports.default = DishType;