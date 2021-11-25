const _forEach = require('./forEach');
const _map = require('./map');
const _filter = require('./filter');
const _find = require('./find');
const _findIndex = require('./findIndex');
const _reduce = require('./reduce');
const _every = require('./every');
const _some = require('./some');

Array.prototype._forEach = _forEach;
Array.prototype._map = _map;
Array.prototype._filter = _filter;
Array.prototype._find = _find;
Array.prototype._findIndex = _findIndex;
Array.prototype._reduce = _reduce;
Array.prototype._every = _every;
Array.prototype._some = _some;

module.exports = Array;
