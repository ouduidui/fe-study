const trim = require('./trim');
const slice = require('./slice');

String.prototype._trim = trim;
String.prototype._slice = slice;

module.exports = String;
