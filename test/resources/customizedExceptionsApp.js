var _ = require('lodash');
var express = require('express');
var app = express();
var swaggerSpecMiddleware = require('../../index.js');

var exceptionsHandlers = {
    'getExceptions': function () {
        throw "Sample exception message"
    },
    'getCustomExceptionsMessage': function () {
        throw {message: "Custom exception message"}
    },
    'getCustomExceptionsMessageAndStatus': function () {
        throw {message: "Custom exception message with status", status: 401}
    }
}
swaggerSpecMiddleware.host(app, {
    spec: 'test/resources/toyStore.json',
    handlers: _.merge(exceptionsHandlers),
    defaultExceptionStatus: 403,
    defaultExceptionMessage: 'Customized unknown exception occured',
    unhandledOperationHandler: function (req, res) {
        throw {status: 403, message: 'Customized unhandled operation'};
    }

});
app.get('/test', function (req, res) {
    console.log('hitting test');
    res.json({status: 'ok'});
});
app.get('/*', function (req, res) {
    console.log('hitting default hander outside swagger-spec-middleware');
    res.send(402);
});
console.log('customized exception app started');
module.exports = app;

