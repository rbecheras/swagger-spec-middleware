define(function (require) {
    var suite = require('intern!object'),
        app = require('intern/dojo/node!./app'),
        chai = require('intern/dojo/node!chai'), //dellivers promieses implementation used in setup method
        expect = chai.expect,
        chaiHttp = require('intern/dojo/node!chai-http'), //dellivers promieses implementation used in setup method
        q = require('intern/dojo/node!q'), //dellivers promieses implementation used in setup method
        portfinder = require('intern/dojo/node!portfinder'); //dellivers promieses implementation used in setup method

    var me = this;
    var api = function () {
        return chai.request('http://localhost:' + me.port);
    }

    var get = function (path, entityType) {
        return api().get(path).then(function (res) {
            expect(res).to.have.status(200);
        });
    };

    var post = function (path, entityType) {
        return api().post(path).then(function (res) {
            expect(res).to.have.status(200);
        });
    };

    var put = function (path, entityType) {
        return api().put(path).then(function (res) {
            expect(res).to.have.status(200);
        });
    };

    var del = function (path, entityType) {
        return api().delete(path).then(function (res) {
            expect(res).to.have.status(200);
        });
    };

    var checkCrudStatus = function (path, entityType) {
        return q.all([
            get(path, entityType),
            post(path, entityType),
            put(path, entityType),
            del(path, entityType)
        ]);
    };

    suite({
        'setup': function () {
            chai.use(chaiHttp); //configure chai with chaiHttp
            chai.request.addPromises(q.Promise); //configure promise for chaiHttp

            var defer = q.defer();
            portfinder.getPort(function (err, port) {
                me.port = port;
                me.server = app.listen(me.port, function () {
                    console.log('server is running on port %j', me.port);
                    defer.resolve();
                });
            });
            return defer.promise;

        },
        'teardown': function () {
            me.server.close();
        },
        'Should perform basic operations on pets by operationId, and also that custom operationId is before default handlers': function () {
            return checkCrudStatus('/api/pets', 'pet');
            ;
        },
        'Should perform basic operations on cars by default operation name': function () {
            return checkCrudStatus('/api/cars', 'car');
        },
        'Should perform basic operationson planes by operationId that is before default handlers': function () {
            return checkCrudStatus('/api/planes', 'plane');
        }
    });
});
