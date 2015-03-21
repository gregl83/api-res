function Response(v, u, m) {
  var self = this;

  var res = {"valid": false, "uri": "", "message": []};

  // todo write module


  self.valid = function(val) {
    if ("boolean" !== typeof val) throw new Error("valid must be true or false");
    res.valid = val;
  };

  self.uri = function(val) {
    // todo consider using url.parse to validate
    res.uri = val;
  };

  self.message = function(type, description, parameter) {
    // todo validation
    res.message.push({
      "type": type,
      "description": description,
      "parameter": parameter
    });
  };

  self.toString = function() {
    return JSON.stringify(res);
  }
}

module.exports = Response;