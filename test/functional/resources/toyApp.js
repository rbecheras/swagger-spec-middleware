var _ = require('lodash');
var express = require('express');
var app = express();
var swaggerSpecMiddleware = require('../../../index.js');

var handledFunction = function (meta) {
    return "handled";
};

var notHandledFunction = function (meta) {
    return "not handled";
};

var petsHandlers = {
    'petsGet': handledFunction,
    'petsPost': handledFunction,
    'petsPut': handledFunction,
    'petsDel': handledFunction,
    'petsOptions': handledFunction,
    'petsHead': handledFunction,
    'petsPatch': handledFunction
};

var carsHandlers = {
    'getCars': handledFunction,
    'postCars': handledFunction,
    'putCars': handledFunction,
    'deleteCars': handledFunction,
    'optionsCars': handledFunction,
    'headCars': handledFunction,
    'patchCars': handledFunction
};

var planesHandlers = {
    'planesGet': handledFunction,
    'planesPost': handledFunction,
    'planesPut': handledFunction,
    'planesDel': handledFunction,
    'planesOptions': handledFunction,
    'planesHead': handledFunction,
    'planesPatch': handledFunction,
    'getPlanes': notHandledFunction,
    'postPlanes': notHandledFunction,
    'putPlanes': notHandledFunction,
    'deletePlanes': notHandledFunction,
    'optionsPlanes': notHandledFunction,
    'headPlanes': notHandledFunction,
    'patchPlanes': notHandledFunction
};

var dollsHandlers = {
    'getDolls': function (meta, limit, name) {
        return {limit: limit, name: name};
    },
    'postDolls': notHandledFunction,
    'putDolls': notHandledFunction,
    'deleteDolls': notHandledFunction
};

var exceptionsHandlers = {
    'getExceptions': function(){
        throw "Sample exception message"
    },
    'getCustomExceptionsMessage': function(){
        throw {message: "Custom exception message"}
    },
    'getCustomExceptionsMessageAndStatus': function(){
        throw {message: "Custom exception message with status", status: 401}
    }
}

swaggerSpecMiddleware.host(app, {
    spec: 'test/functional/resources/toyStore.json',
    handlers: _.merge(petsHandlers, carsHandlers, planesHandlers, dollsHandlers, exceptionsHandlers)

});
app.get('/test', function (req, res) {
    console.log('hitting test');
    res.json({status: 'ok'});
});
console.log('app started');
module.exports = app;

