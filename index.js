'use strict';

function SVGO(opts) {
    if (!(this instanceof SVGO)) {
        return new SVGO(opts);
    }

    this.opts = opts;
}

SVGO.prototype.optimize = function(data) {
    return data;
};

module.exports = SVGO;
