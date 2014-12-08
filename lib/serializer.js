'use strict';

var options = {
    doctypeStart: '<!DOCTYPE',
    doctypeEnd: '>',
    procInstStart: '<?',
    procInstEnd: '?>',
    tagOpenStart: '<',
    tagOpenEnd: '>',
    tagCloseStart: '</',
    tagCloseEnd: '>',
    tagShortStart: '<',
    tagShortEnd: '/>',
    attrValueStart: '="',
    attrValueEnd: '"',
    commentStart: '<!--',
    commentEnd: '-->',
    cdataStart: '<![CDATA[',
    cdataEnd: ']]>',
    textStart: '',
    textEnd: '',
    indent: '    ',
    pretty: false
};

var Serializer = function(opts) {
    if (!(this instanceof Serializer)) {
        return new Serializer(opts);
    }

    this.opts = JSON.parse(JSON.stringify(options));

    if (opts) {
        for (var k in opts) {
            if (opts.hasOwnProperty(k)) {
                this.opts[k] = opts[k];
            }
        }
    }

    if (this.opts.pretty) {
        this.opts.doctypeEnd += '\n';
        this.opts.procInstEnd += '\n';
        this.opts.commentEnd += '\n';
        this.opts.cdataEnd += '\n';
        this.opts.tagShortEnd += '\n';
        this.opts.tagOpenEnd += '\n';
        this.opts.tagCloseEnd += '\n';
        this.opts.textEnd += '\n';
    }

    this.indentLevel = 0;
};

Serializer.prototype.serialize = function(data) {
    var str = '';

    if (data && data.content && data.content.length) {
        this.indentLevel++;

        for (var i = 0, l = data.content.length; i < l; i++) {
            var item = data.content[i];

            if (item.elem) {
                str += this.elem(item);
            } else if (item.text) {
                str += this.text(item.text);
            } else if (item.doctype) {
                str += this.doctype(item.doctype);
            } else if (item.processingInstruction) {
                str += this.processingInstruction(item.processingInstruction);
            } else if (item.comment) {
                str += this.comment(item.comment);
            } else if (item.cdata) {
                str += this.cdata(item.cdata);
            }
        }
    }

    this.indentLevel--;

    return str;
};

Serializer.prototype.indent = function() {
    var indent = '';

    if (this.opts.pretty) {
        for (var i = 1; i < this.indentLevel; i++) {
            indent += this.opts.indent;
        }
    }

    return indent;
};

Serializer.prototype.doctype = function(doctype) {
    return this.opts.doctypeStart +
           doctype +
           this.opts.doctypeEnd;
};

Serializer.prototype.processingInstruction = function(inst) {
    return this.opts.procInstStart +
           inst.name +
           ' ' +
           inst.body +
           this.opts.procInstEnd;
};

Serializer.prototype.cdata = function(cdata) {
    return this.opts.cdataStart +
           cdata +
           this.opts.cdataEnd;
};

Serializer.prototype.comment = function(comment) {
    return this.opts.commentStart +
           comment +
           this.opts.commentEnd;
};

Serializer.prototype.elem = function(data) {
    if (!data.content || !data.content.length) {
        return this.indent() +
               this.opts.tagShortStart +
               data.elem +
               this.attrs(data) +
               this.opts.tagShortEnd;
    }

    return this.indent() +
           this.opts.tagOpenStart +
           data.elem +
           this.attrs(data) +
           this.opts.tagOpenEnd +
           this.serialize(data) +
           this.indent() +
           this.opts.tagCloseStart +
           data.elem +
           this.opts.tagCloseEnd;
};

Serializer.prototype.attrs = function(elem) {
    var attrs = '';

    /*eslint-disable guard-for-in */
    for (var k in elem.attrs) {
        var attr = elem.attrs[k];

        attrs += ' ' +
                 attr.name +
                 this.opts.attrValueStart +
                 attr.value +
                 this.opts.attrValueEnd;
    }
    /*eslint-enable guard-for-in */

    return attrs;
};

Serializer.prototype.text = function(text) {
    return this.indent() +
           this.opts.textStart +
           text +
           this.opts.textEnd;
};

module.exports = Serializer;
