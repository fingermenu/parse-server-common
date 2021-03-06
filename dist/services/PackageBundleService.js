'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PackageBundleService = function (_ServiceBase) {
  _inherits(PackageBundleService, _ServiceBase);

  function PackageBundleService() {
    _classCallCheck(this, PackageBundleService);

    return _possibleConstructorReturn(this, (PackageBundleService.__proto__ || Object.getPrototypeOf(PackageBundleService)).call(this, _schema.PackageBundle, PackageBundleService.buildSearchQuery, PackageBundleService.buildIncludeQuery, 'package bundle'));
  }

  return PackageBundleService;
}(_parseServerCommon.ServiceBase);

PackageBundleService.fields = _immutable.List.of('url', 'checksum', 'restaurant');

PackageBundleService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'restaurant');

  return query;
};

PackageBundleService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _parseServerCommon.ParseWrapperService.createQuery(_schema.PackageBundle, criteria);
  var query = PackageBundleService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  PackageBundleService.fields.forEach(function (field) {
    _parseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'url', 'url');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'checksum', 'checksum');
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'restaurant', 'restaurant', _schema.Restaurant);

  return query;
};

exports.default = PackageBundleService;