function Response() {
  var self = this;

  // public object properties
  self.hasErrors = false;

  // check data type
  function isType(type, value) {
    if ('array' ===  type) return Array.isArray(value);
    return (type === typeof value);
  }

  var res = {
    "data": []
  };

  var meta = {};
  var links = {};
  var errors = [];
  var included = {};

  // overwrites all existing data on collision
  self.meta = function(meta) {
    if ('object' !== typeof meta) return;
    Object.keys(meta).forEach(function(data, key) {
      meta[key] = data;
    });
  };

  self.link = function(name, link) {
    links[name] = link;
  };

  var errorFormat = {
    "id": 'string',
    "href": 'string',
    "status": 'number',
    "code": 'string',
    "title": 'string',
    "detail": 'string',
    "links": 'array',
    "paths": 'array'
  };

  // error data that fails type check or invalid error is dropped
  self.error = function(error) {
    if ('object' !== typeof error) return;
    var _error = {};
    Object.keys(error).forEach(function(data, key) {
      if ('undefined' !== typeof errorFormat[key]) {
        if (isType(errorFormat[key], data)) _error[key] = data;
      }
    });
    errors.push(_error);
    self.hasErrors = true;
  };

  self.include = function(name, include) {
    included[name] = include;
  };

  function isEmptyObject(object) {
    return !Object.keys(object).length;
  }

  self.toString = function() {
    if (!isEmptyObject(meta)) res.meta = meta;
    if (!isEmptyObject(links)) res.links = links;
    if (!!errors.length) res.errors = errors;
    if (!isEmptyObject(included)) res.included = included;
    return JSON.stringify(res);
  }
}

module.exports = Response;