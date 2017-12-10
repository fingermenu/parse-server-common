'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_BaseObject) {
  _inherits(Menu, _BaseObject);

  function Menu(object) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, object, 'Menu'));

    _initialiseProps.call(_this);

    return _this;
  }

  return Menu;
}(_microBusinessParseServerCommon.BaseObject);

Menu.spawn = function (info) {
  var object = new Menu();

  Menu.updateInfoInternal(object, info);

  return object;
};

Menu.updateInfoInternal = function (object, info) {
  _microBusinessParseServerCommon.BaseObject.createStringColumn(object, info, 'name');
  _microBusinessParseServerCommon.BaseObject.createStringColumn(object, info, 'description');
  object.set('menuPageUrl', info.get('menuPageUrl'));
  object.set('imageUrl', info.get('imageUrl'));
  _microBusinessParseServerCommon.BaseObject.createArrayPointer(object, info, 'menuItem', _MenuItem2.default);
  _microBusinessParseServerCommon.BaseObject.createArrayPointer(object, info, 'tag', _Tag2.default);
  _microBusinessParseServerCommon.BaseObject.createUserPointer(object, info, 'ownedByUser');
  _microBusinessParseServerCommon.BaseObject.createUserArrayPointer(object, info, 'maintainedByUser');
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    Menu.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var menuItemObjects = object.get('menuItems');
    var menuItems = menuItemObjects ? _immutable2.default.fromJS(menuItemObjects).map(function (menuItem) {
      return new _MenuItem2.default(menuItem).getInfo();
    }) : undefined;
    var tagObjects = object.get('tags');
    var tags = tagObjects ? _immutable2.default.fromJS(tagObjects).map(function (tag) {
      return new _Tag2.default(tag).getInfo();
    }) : undefined;
    var ownedByUser = object.get('ownedByUser');
    var maintainedByUsers = _immutable2.default.fromJS(object.get('maintainedByUsers'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: object.get('name'),
      description: object.get('description'),
      menuPageUrl: object.get('menuPageUrl'),
      imageUrl: object.get('imageUrl'),
      menuItems: menuItems,
      menuItemIds: menuItems ? menuItems.map(function (menuItem) {
        return menuItem.get('id');
      }) : (0, _immutable.List)(),
      tags: tags,
      tagIds: tags ? tags.map(function (tag) {
        return tag.get('id');
      }) : (0, _immutable.List)(),
      ownedByUser: ownedByUser,
      ownedByUserId: ownedByUser ? ownedByUser.id : undefined,
      maintainedByUsers: maintainedByUsers,
      maintainedByUserIds: maintainedByUsers ? maintainedByUsers.map(function (maintainedByUser) {
        return maintainedByUser.id;
      }) : (0, _immutable.List)()
    });
  };
};

exports.default = Menu;