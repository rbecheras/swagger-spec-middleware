define(function (require) {
    var suite = require('intern!object');
    var parameterConverter = require('intern/dojo/node!../../src/parameterConverter');
    var expect = require('intern/chai!expect');


    suite({
        'should convert to integer parameter': function () {
            expect(parameterConverter.convert('12345', 'integer', 'int32', undefined)).to.eql(12345);
        },
        'should convert to long parameter': function () {
            expect(parameterConverter.convert('12345', 'integer', 'int64', undefined)).to.eql(12345);
        },
        'should convert to float parameter': function () {
            expect(parameterConverter.convert('12.345', 'number', 'float', undefined)).to.eql(12.345);
        },
        'should convert to double parameter': function () {
            expect(parameterConverter.convert('12.345', 'number', 'double', undefined)).to.eql(12.345);
        },
        'should convert string parameter': function () {
            expect(parameterConverter.convert('abc', 'string', undefined, undefined)).to.eql("abc");
        },
        'should convert byte parameter': function () {
            expect(parameterConverter.convert('abc', 'string', 'byte', undefined)).to.eql("abc");
        },
        'should convert boolean parameter': function () {
            expect(parameterConverter.convert('true', 'boolean', undefined, undefined)).to.eql(true);
        },
        'should convert date parameter': function () {
            expect(parameterConverter.convert('2015-09-29', 'string', 'date', undefined)).to.eql(new Date('2015-09-29'));
        },
        'should convert dateTime parameter': function () {
            expect(parameterConverter.convert('2015-09-29T23:59:59', 'string', 'date-time', undefined)).to.eql(new Date('2015-09-29T23:59:59'));
        },
        'should throw exception when configuration not found': function () {
            try {
                parameterConverter.convert('abc', 'aaa', 'bbb', undefined);
            } catch (e) {
                expect(e).is.eql('Could not convert value: abc, for type: aaa, format: bbb, items: undefined');
            }
        }
    });
});