'use strict';

var sax = require('sax');

// https://github.com/isaacs/sax-js#arguments
var options = {
    strict: true,
    trim: true,
    normalize: true,
    lowercase: true,
    xmlns: true,
    position: false
};

function Parser(opts) {
    if (!(this instanceof Parser)) {
        return new Parser(opts);
    }

    this.opts = JSON.parse(JSON.stringify(options));

    if (opts) {
        for (var k in opts) {
            if (opts.hasOwnProperty(k)) {
                this.opts[k] = opts[k];
            }
        }
    }

    this.sax = sax.parser(this.opts.strict, this.opts);
    this.root = {};
    this.current = this.root;
    this.stack = [];
}

Parser.prototype.pushToContent = function(content) {
    this.current.content = this.current.content || [];
    this.current.content.push(content);

    return content;
};

Parser.prototype.parse = function(data, callback) {
    var that = this;

    this.sax.onopentag = function(data) {
        var elem = {
            elem: data.name,
            prefix: data.prefix,
            local: data.local
        };
        var attrs = data.attributes;

        if (Object.keys(attrs).length) {
            elem.attrs = {};

            for (var attrName in attrs) {
                if (attrs.hasOwnProperty(attrName)) {
                    var attr = attrs[attrName];

                    elem.attrs[attrName] = {
                        name: attrName,
                        value: attr.value,
                        prefix: attr.prefix,
                        local: attr.local
                    };
                }
            }
        }

        that.current = that.pushToContent(elem);
        that.stack.push(that.current);
    };

    this.sax.onclosetag = function() {
        that.stack.pop();
        that.current = that.stack[that.stack.length - 1];
    };

    this.sax.ontext = function(text) {
        that.pushToContent({ text: text });
    };

    this.sax.ondoctype = function(doctype) {
        that.pushToContent({ doctype: doctype });
    };

    this.sax.onprocessinginstruction = function(data) {
        that.pushToContent({ processingInstruction: data });
    };

    this.sax.oncomment = function(comment) {
        that.pushToContent({ comment: comment });
    };

    this.sax.oncdata = function(cdata) {
        that.pushToContent({ cdata: cdata });
    };

    this.sax.onerror = function(err) {
        callback(err);

        // https://github.com/isaacs/sax-js#events
        // "The error will be hanging out on Parse.error,
        // and must be deleted before parsing can continue"
        this.error = null;
    };

    this.sax.onend = function() {
        callback(null, that.root);
    };

    this.sax.write(data).close();
};

module.exports = Parser;
