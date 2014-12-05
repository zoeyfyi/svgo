'use strict';

var Parser = require('./lib/parser');
var Serializer = require('./lib/serializer');

function SVGO(opts) {
    if (!(this instanceof SVGO)) {
        return new SVGO(opts);
    }

    this.opts = opts;
}

SVGO.prototype.optimize = function(data, callback) {
    Parser().parse(data, function(err, obj) {
        if (err) {
            return callback(err);
        }

        data = Serializer({ pretty: true }).serialize(obj);
        callback(null, data);
    });
};

module.exports = SVGO;
