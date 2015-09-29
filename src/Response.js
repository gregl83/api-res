// todo implement resource object

function Response(options) {
  var self = this;

  if ('undefined' === typeof options) options = {};

  // public object properties
  self.hasErrors = false;

  // check data type
  function isType(type, value) {
    if ('array' ===  type) return Array.isArray(value);
    return (type === typeof value);
  }

  // check if object is empty
  function isEmptyObject(object) {
    return !Object.keys(object).length;
  }

  // private response object
  var res = {};

  var data = (options.collection) ? [] : null;
  var meta = {};
  var links = {};
  var errors = [];
  var included = {};

  // overwrites all existing data on collision
  self.meta = function(data) {
    if ('object' !== typeof data) return;

    Object.keys(data).forEach(function(name) {
      meta[name] = data[name];
    });

    return self;
  };

  self.link = function(name, link) {
    links[name] = link;

    return self;
  };

  // push to data if collection or set to data if single object
  self.data = function(val) {
    if (options.collection) data.push(val);
    else data = val;

    return self;
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

    Object.keys(error).forEach(function(name) {
      if ('undefined' !== typeof errorFormat[name]) {
        if (isType(errorFormat[name], error[name])) _error[name] = error[name];
      }
    });

    if (!isEmptyObject(_error)) {
      errors.push(_error);
      self.hasErrors = true;
    }

    return self;
  };

  self.include = function(name, include) {
    included[name] = include;

    return self;
  };

  self.toJSON = function() {
    if (!self.hasErrors) res.data = data;
    if (!isEmptyObject(meta)) res.meta = meta;
    if (!isEmptyObject(links)) res.links = links;
    if (self.hasErrors) res.errors = errors;
    if (!isEmptyObject(included)) res.included = included;
    return res;
  };

  self.toString = function() {
    return JSON.stringify(self.toJSON());
  }
}

module.exports = Response;