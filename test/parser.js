'use strict';

var expect = require('chai').expect;
var Parser = require('../lib/parser');

describe('Parser', function() {
    describe('interface', function() {
        it('Parser should exist', function() {
            expect(Parser).to.exist;
        });

        it('Parser should be an instance of Function', function() {
            expect(Parser).to.be.an.instanceof(Function);
        });

        it('Parser() should be an instance of Parser', function() {
            expect(Parser()).to.be.an.instanceof(Parser);
        });
    });

    describe('options', function() {
        it('Parser() should have default options', function() {
            var parser = Parser();

            expect(parser).to.have.ownProperty('opts').that.is.an('object');
            expect(parser).to.have.deep.property('opts.strict');
            expect(parser).to.have.deep.property('opts.trim');
            expect(parser).to.have.deep.property('opts.normalize');
            expect(parser).to.have.deep.property('opts.lowercase');
            expect(parser).to.have.deep.property('opts.xmlns');
            expect(parser).to.have.deep.property('opts.position');
        });

        it('Parser({ ... }) should extend default options', function() {
            var parser = Parser({
                strict: false,
                trim: false
            });

            expect(parser).to.have.deep.property('opts.strict', false);
            expect(parser).to.have.deep.property('opts.trim', false);
        });
    });
});
