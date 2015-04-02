var fs = require('fs');
var _ = require('lodash');
var schemaValidator = require('./schemaValidator');
var handlerBuilder = require('./handlerBuilder');

module.exports.host = function (app, config) {
    config = _.merge({
        spec: 'spec.json',
        basePath: '/api',
        handlers: {},
        defaultExceptionStatus: 404,
        defaultExceptionMessage: 'Unknown exception occured',
        unhandledOperationHandler: function (req, res) {
            throw {status: 404, message: 'Unhandled operation'};
        }
    }, config);

    var readJsonFile = function (filePath) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    };

    var readSpec = function (inputSpecConfig) {
        return _.isObject(inputSpecConfig) ? inputSpecConfig : readJsonFile(inputSpecConfig);
    };

    var readSpecPath = function (inputSpecConfig) {
        return _.isObject(inputSpecConfig) ? "<<Inline Swagger Spec object>>" : inputSpecConfig;
    };
    
    var spec = readSpec(config.spec);
    var specPath = readSpecPath(config.spec);

    console.log("Validating spec from: " + specPath);
    schemaValidator.validateAgainstSwaggerSchema(spec);
    
    console.log("Building handlers");
    handlerBuilder.buildHandlersForSpec(app, spec,
        config.basePath,
        config.handlers,
        config.defaultExceptionStatus,
        config.defaultExceptionMessage,
        config.unhandledOperationHandler);


};