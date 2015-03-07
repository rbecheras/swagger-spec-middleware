define(function (require) {
    var suite = require('intern!object'),
        app = require('intern/dojo/node!./resources/app'),
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
                //expect(limit).is.eql(10);
                //expect(name).is.eql('test');
                console.log(res.body);
            });
        }
    });
});
