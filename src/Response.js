function Response(v, u, m) {
  var self = this;

  var res = {"valid": false, "uri": "", "message": []};

  // todo write module


  self.valid = function() {

  };

  self.uri = function() {

  };

  self.message = function() {

  };

  self.toString = function() {
    return JSON.stringify(res);
  }
}

module.exports = Response;