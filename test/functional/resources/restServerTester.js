define(function (require) {
    var me = this,
        portfinder = require('intern/dojo/node!portfinder'), //dellivers promieses implementation used in setup method
        chai = require('intern/dojo/node!chai'), //dellivers promieses implementation used in setup method
        chaiHttp = require('intern/dojo/node!chai-http'), //dellivers promieses implementation used in setup method
        q = require('intern/dojo/node!q'); //dellivers promieses implementation used in setup method
    me.chai = chai;

    me.init = function (app) {
        return function () {
            var defer = q.defer();
            chai.use(chaiHttp); //configure chai with chaiHttp
            chai.request.addPromises(q.Promise); //configure promise for chaiHttp

            portfinder.getPort(function (err, port) {
                me.port = port;
                me.server = app.listen(me.port, function () {
                    console.log('server is running on port %j', me.port);
                    defer.resolve();
                });
            });
            return defer.promise;
        };
    };

    me.destroy = function () {
        return function () {
            me.server.close();
            console.log('server closed on port: %j', me.port);
        };
    };

    me.api = function () {
        return chai.request('http://localhost:' + me.port);
    };

    me.get = function (path, callback) {
        return api().get(path).then(callback);
    };

    me.post = function (path, callback) {
        return api().post(path).then(callback);
    };

    me.put = function (path, callback) {
        return api().put(path).then(callback);
    };

    me.del = function (path, callback) {
        return api().delete(path).then(callback);
    };

    me.crud = function (path, callback) {
        return q.all([
            me.get(path, callback),
            me.post(path, callback),
            me.put(path, callback),
            me.del(path, callback)
        ]);
    };

    return me;
});