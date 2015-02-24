define(function (require) {
    var suite = require('intern!object');
    var expect = require('intern/chai!expect');

    suite({
        'test sample CommonJS app': function () {
            var app = require('intern/dojo/node!../../app/app');
            expect(app.hello('Marysia')).to.equal('Hello, Marysia');
            expect(app.hello('Piotr')).to.equal('Siema');
        }
    });
});

