function Response() {
  // todo construct
}

// todo write module

Response.prototype.valid = false;

Response.prototype.uri = '';

Response.prototype.message = [];

Response.prototype.toString = function() {
  return JSON.stringify({valid: this.valid, uri: this.uri, message: this.message});
};

module.exports = Response;