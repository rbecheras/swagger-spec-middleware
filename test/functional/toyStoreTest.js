define(function (require) {
    var suite = require('intern!object'),
        app = require('intern/dojo/node!./resources/toyApp'),
        tester = require('./resources/restServerTester'),
        chai = tester.chai,
        expect = chai.expect;

    var shoudStatusEq200 = function (res) {
        expect(res).to.have.status(200);
    };

    suite({
        'setup': tester.init(app),
        'teardown': tester.destroy(),
        'Should perform basic operations by operationId, and also that custom operationId is before default handlers': function () {
            return tester.crud('/api/pets', shoudStatusEq200);
        },
        'Should perform basic operations by default operation name': function () {
            return tester.crud('/api/cars', shoudStatusEq200);
        },
        'Should perform basic operations by operationId that is before default handlers': function () {
            return tester.crud('/api/planes', shoudStatusEq200);
        },
        'Should perform basic operations by operationId that is before default handlers': function () {
            return tester.crud('/api/planes', shoudStatusEq200);
        },
        'Should handle query parameter in get request': function () {
            return tester.get('/api/dolls?limit=10&name=test', function (res) {
                expect(res.body).is.eql({limit: 10, name: 'test'});
            });
        },
        'Should receive status 404 for non existing resource': function () {
            return tester.get('/api/notExistingResource', function (res) {
                expect(res.error.status).is.eql(404);
            });
        },
        'Should receive status 404 with message for unhandled operation': function () {
            return tester.get('/api/unhandled', function (res) {
                expect(res.error.status).is.eql(404);
                expect(res.error.text).is.eql('Unhandled operation');
            });
        },
        'Should receive status 404 when generic exception has been thrown': function () {
            return tester.get('/api/exceptions', function (res) {
                expect(res).to.have.status(404);
                expect(res.error.text).is.eql('Unknown exception occured');
            });
        },
        'Should receive status 404 with custom message when customized exception has been thrown': function () {
            return tester.get('/api/customExceptionsMessage', function (res) {
                expect(res).to.have.status(404);
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
