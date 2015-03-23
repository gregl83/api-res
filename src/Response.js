function Response() {
  var self = this;

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

  var res = {
    "data": []
  };

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
    Object.keys(error).forEach(function(name) {
      console.log(name, error[name]);
      if ('undefined' !== typeof errorFormat[name]) {
        if (isType(errorFormat[name], error[name])) _error[name] = error[name];
      }
    });
    if (!isEmptyObject(_error)) {
      errors.push(_error);
      self.hasErrors = true;
    }
  };

  self.include = function(name, include) {
    included[name] = include;
  };

  function buildResponse() {
    if (!isEmptyObject(meta)) res.meta = meta;
    if (!isEmptyObject(links)) res.links = links;
    if (!!errors.length) res.errors = errors;
    if (!isEmptyObject(included)) res.included = included;
  }

  self.o = self.toObject = function() {
    buildResponse();
    return res;
  };

  self.s = self.toString = function() {
    buildResponse();
    return JSON.stringify(res);
  }
}

module.exports = Response;