function Response() {
  var self = this;

  self.hasErrors = false;

  // todo write module based on the jsonapi.org specification

  var res = {
    "data": []
  };

  var meta = {};
  var links = {};
  var errors = [];
  var included = {};

  self.meta = function(name, meta) {
    meta[name] = meta;
  };

  self.link = function(name, link) {
    links[name] = link;
  };

  self.error = function(error) {
    errors.push(error);
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
    if (!errors.length) res.errors = errors;
    if (!isEmptyObject(included)) res.included = included;
    return JSON.stringify(res);
  }
}

module.exports = Response;