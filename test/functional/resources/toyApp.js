var _ = require('lodash');
var express = require('express');
var app = express();
var swaggerSpecMiddleware = require('../../../index.js');

var petsHandlers = {
    'petsGet': function (meta) {
        return "handled";
    },
    'petsPost': function (meta) {
        return "handled";
    },
    'petsPut': function (meta) {
        return "handled";
    },
    'petsDel': function (meta) {
        return "handled";
    }
};

var carsHandlers = {
    'getCars': function (meta) {
        return "handled";
    },
    'postCars': function (meta) {
        return "handled";
    },
    'putCars': function (meta) {
        return "handled";
    },
    'deleteCars': function (meta) {
        return "handled";
    }
};

var planesHandlers = {
    'planesGet': function (meta) {
        return "handled";
    },
    'planesPost': function (meta) {
        return "handled";
    },
    'planesPut': function (meta) {
        return "handled";
    },
    'planesDel': function (meta) {
        return "handled";
    },
    'getPlanes': function (meta) {
        return "not handled";
    },
    'postPlanes': function (meta) {
        return "not handled";
    },
    'putPlanes': function (meta) {
        return "not handled";
    },
    'deletePlanes': function (meta) {
        return "not handled";
    }
};

var dollsHandlers = {
    'getDolls': function (meta, limit, name) {
        return {limit: limit, name: name};
    },
    'postDolls': function (meta) {
        return "not handled";
    },
    'putDolls': function (meta) {
        return "not handled";
    },
    'deleteDolls': function (meta) {
        return "not handled";
    }
};
swaggerSpecMiddleware.host(app, {
    spec: 'test/functional/resources/toyStore.json',
    handlers: _.merge(petsHandlers, carsHandlers, planesHandlers, dollsHandlers)
    
});
app.get('/test', function (req, res) {
    console.log('hitting test');
    res.json({status: 'ok'});
});
console.log('app started');
module.exports = app;

