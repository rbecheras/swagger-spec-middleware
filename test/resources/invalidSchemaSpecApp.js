var _ = require('lodash');
var express = require('express');
var app = express();
var swaggerSpecMiddleware = require('../../index.js');

swaggerSpecMiddleware.host(app, {
    spec: 'test/resources/invalidSchemaSpec.json'
});
app.get('/test', function (req, res) {
    console.log('hitting test');
    res.json({status: 'ok'});
});
console.log('invalid schema spec app started');

module.exports = app;

