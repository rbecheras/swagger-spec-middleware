define(function (require) {
    var suite = require('intern!object'),
        app = require('intern/dojo/node!./resources/customizedExceptionsApp'),
        tester = require('./resources/restServerTester'),
        chai = tester.chai,
        expect = chai.expect;

    suite({
        'setup': tester.init(app),
        'teardown': tester.destroy(),
        'Should receive status 402 for non existing resource': function () {
            return tester.get('/api/notExistingResource', function (res) {
                expect(res.error.status).is.eql(402);
            });
        },
        'Should receive status 403 with message for unhandled operation': function () {
            return tester.get('/api/unhandled', function (res) {
                expect(res.error.status).is.eql(403);
                expect(res.error.text).is.eql('Customized unhandled operation');
            });
        },
        'Should receive status customized 403 when generic exception has been thrown': function () {
            return tester.get('/api/exceptions', function (res) {
                expect(res).to.have.status(403);
                expect(res.error.text).is.eql('Customized unknown exception occured');
            });
        },
        'Should receive customized status 403 with custom message when customized exception has been thrown': function () {
            return tester.get('/api/customExceptionsMessage', function (res) {
                expect(res).to.have.status(403);
                expect(res.error.text).is.eql('Custom exception message');
            });
        },
        'Should receive status 401 with custom message when customized exception with 401 status has been thrown': function () {
            return tester.get('/api/customExceptionsMessageAndStatus', function (res) {
                expect(res).to.have.status(401);
                expect(res.error.text).is.eql('Custom exception message with status');
            });
        }
    });
});
