'use strict';

var parser = require('./lib/parser');
var serializer = require('./lib/serializer');

function SVGO(opts) {
    if (!(this instanceof SVGO)) {
        return new SVGO(opts);
    }

    this.opts = opts;
}

SVGO.prototype.optimize = function(data, callback) {
    parser().parse(data, function(err, obj) {
        if (err) {
            return callback(err);
        }

        data = serializer({ pretty: true }).serialize(obj);
        callback(null, data);
    });
};

module.exports = SVGO;
