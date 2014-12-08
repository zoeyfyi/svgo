'use strict';

var expect = require('chai').expect;
var Serializer = require('../lib/serializer');

describe('Serializer', function() {
    describe('interface', function() {
        it('Serializer should exist', function() {
            expect(Serializer).to.exist;
        });

        it('Serializer should be an instance of Function', function() {
            expect(Serializer).to.be.an.instanceof(Function);
        });

        it('Serializer() should be an instance of Parser', function() {
            expect(Serializer()).to.be.an.instanceof(Serializer);
        });
    });

    describe('options', function() {
        it('Serializer() should have default options', function() {
            var serializer = Serializer();

            expect(serializer).to.have.ownProperty('opts').that.is.an('object');
            expect(serializer).to.have.deep.property('opts.tagOpenStart');
            expect(serializer).to.have.deep.property('opts.tagOpenEnd');
            expect(serializer).to.have.deep.property('opts.tagCloseStart');
            expect(serializer).to.have.deep.property('opts.tagCloseEnd');
            expect(serializer).to.have.deep.property('opts.tagShortStart');
            expect(serializer).to.have.deep.property('opts.tagShortEnd');
            expect(serializer).to.have.deep.property('opts.attrValueStart');
            expect(serializer).to.have.deep.property('opts.attrValueEnd');
            expect(serializer).to.have.deep.property('opts.commentStart');
            expect(serializer).to.have.deep.property('opts.commentEnd');
            expect(serializer).to.have.deep.property('opts.cdataStart');
            expect(serializer).to.have.deep.property('opts.cdataEnd');
            expect(serializer).to.have.deep.property('opts.textStart');
            expect(serializer).to.have.deep.property('opts.textEnd');
            expect(serializer).to.have.deep.property('opts.indent');
            expect(serializer).to.have.deep.property('opts.pretty');
        });

        it('Serializer({ ... }) should extend default options', function() {
            var serializer = Serializer({
                pretty: true
            });

            expect(serializer).to.have.deep.property('opts.pretty', true);
        });
    });
});
