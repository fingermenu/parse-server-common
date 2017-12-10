'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuService = function (_ServiceBase) {
  _inherits(MenuService, _ServiceBase);

  function MenuService() {
    _classCallCheck(this, MenuService);

    return _possibleConstructorReturn(this, (MenuService.__proto__ || Object.getPrototypeOf(MenuService)).call(this, _schema.Menu, MenuService.buildSearchQuery, MenuService.buildIncludeQuery, 'menu'));
  }

  return MenuService;
}(_microBusinessParseServerCommon.ServiceBase);

MenuService.fields = _immutable.List.of('name', 'description', 'menuPageUrl', 'imageUrl', 'menuItems', 'tags', 'ownedByUser', 'maintainedByUsers');

MenuService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'menuItems');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'ownedByUser');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'maintainedByUsers');

  return query;
};

MenuService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Menu, criteria);
  var query = MenuService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  MenuService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'menuPageUrl', 'menuPageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'menuItem', 'menuItems', _schema.MenuItem);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'ownedByUser', 'ownedByUser');
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'maintainedByUser', 'maintainedByUsers');

  return query;
};

exports.default = MenuService;