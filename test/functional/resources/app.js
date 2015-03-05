var _ = require('lodash');
var express = require('express');
var app = express();
var swaggerSpecMiddleware = require('../../../index.js');

var petsHandlers = {
    'petsGet': function (req, resp) {
        resp.send(200);
    },
    'petsPost': function (req, resp) {
        resp.send(200);
    },
    'petsPut': function (req, resp) {
        resp.send(200);
    },
    'petsDel': function (req, resp) {
        resp.send(200);
    }
};

var carsHandlers = {
    'getCars': function (req, resp) {
        resp.send(200);
    },
    'postCars': function (req, resp) {
        resp.send(200);
    },
    'putCars': function (req, resp) {
        resp.send(200);
    },
    'deleteCars': function (req, resp) {
        resp.send(200);
    }
};

var planesHandlers = {
    'planesGet': function (req, resp) {
        resp.send(200);
    },
    'planesPost': function (req, resp) {
        resp.send(200);
    },
    'planesPut': function (req, resp) {
        resp.send(200);
    },
    'planesDel': function (req, resp) {
        resp.send(200);
    },
    'getPlanes': function (req, resp) {
        resp.send(300);
    },
    'postPlanes': function (req, resp) {
        resp.send(300);
    },
    'putPlanes': function (req, resp) {
        resp.send(300);
    },
    'deletePlanes': function (req, resp) {
        resp.send(300);
    }
};

swaggerSpecMiddleware.host(app, {
    spec: 'test/functional/resources/toystore.json',
    handlers: _.merge(petsHandlers, carsHandlers, planesHandlers)
    
});
app.get('/test', function (req, res) {
    console.log('hitting test');
    res.json({status: 'ok'});
});
console.log('app started');
module.exports = app;

