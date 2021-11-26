const _call = require('./call');
const _apply = require('./apply');
const _bind = require('./bind');

Function.prototype._call = _call;
Function.prototype._apply = _apply;
Function.prototype._bind = _bind;

module.exports = Function;
