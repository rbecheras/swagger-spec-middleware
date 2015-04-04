define(function (require) {
    var suite = require('intern!object');
    var arrayTransformator = require('intern/dojo/node!../../src/arrayTransformator');
    var expect = require('intern/chai!expect');


    suite({
        'should split by default': function () {
            expect(arrayTransformator.split('1,2,3,4')).to.eql(['1', '2', '3', '4']);
        },

        'should join by default': function () {
            expect(arrayTransformator.join(['1', '2', '3', '4'])).to.eql('1,2,3,4');
        },
        'should split by csv': function () {
            expect(arrayTransformator.split('1,2,3,4', 'csv')).to.eql(['1', '2', '3', '4']);
        },

        'should join by csv': function () {
            expect(arrayTransformator.join(['1', '2', '3', '4'], 'csv')).to.eql('1,2,3,4');
        },
        'should split by ssv': function () {
            expect(arrayTransformator.split('1 2 3 4', 'ssv')).to.eql(['1', '2', '3', '4']);
        },

        'should join by ssv': function () {
            expect(arrayTransformator.join(['1', '2', '3', '4'], 'ssv')).to.eql('1 2 3 4');
        },
        'should split by tsv': function () {
            expect(arrayTransformator.split('1\t2\t3\t4', 'tsv')).to.eql(['1', '2', '3', '4']);
        },

        'should join by tsv': function () {
            expect(arrayTransformator.join(['1', '2', '3', '4'], 'tsv')).to.eql('1\t2\t3\t4');
        },
        'should split by pipes': function () {
            expect(arrayTransformator.split('1|2|3|4', 'pipes')).to.eql(['1', '2', '3', '4']);
        },

        'should join by pipes': function () {
            expect(arrayTransformator.join(['1', '2', '3', '4'], 'pipes')).to.eql('1|2|3|4');
        }
    });
});