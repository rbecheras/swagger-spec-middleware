var api = require('hippie');
var app = require('./fixtures/app');

var doneTest = function (done) {
    return function (err) {
        if (err) {
            throw err;
        }
        done();
    };
};

var get = function (path, entity) {
    describe('get ' + path, function () {
        it('returns a ' + entity, function (done) {
            api(app)
                    .get(path)
                    .expectStatus(200)
                    .end(doneTest(done));
        });
    });
};

var post = function (path, entity) {
    describe('post ' + path, function () {
        it('creates ' + entity, function (done) {
            api(app)
                    .post(path)
                    .expectStatus(200)
                    .end(doneTest(done));
        });
    });
};

var put = function (path, entity) {
    describe('put ' + path, function () {
        it('puts ' + entity, function (done) {

            api(app)
                    .put(path)
                    .expectStatus(200)
                    .end(doneTest(done));
        });
    });

};

var del = function (path, entity) {
    describe('delete ' + path, function () {
        it('deletes ' + entity, function (done) {

            api(app)
                    .del(path)
                    .expectStatus(200)
                    .end(doneTest(done));
        });
    });

};

var checkCrudStatus = function (path, entity) {
    get(path, entity);
    post(path, entity);
    put(path, entity);
    del(path, entity);
};

describe('Should perform basic operations on pets by operationId, and also that custom operationId is before default handlers', function () {
    checkCrudStatus('/api/pets', 'pet');
});
describe('Should perform basic operations on cars by default operation name', function () {
    checkCrudStatus('/api/cars', 'car');
});
describe('Should perform basic operationson planes by operationId that is before default handlers', function () {
    checkCrudStatus('/api/planes', 'plane');
});