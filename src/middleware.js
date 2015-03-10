var fs = require('fs');
var _ = require('lodash');
var parameterExtractor = require('./parameterExtractor');

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
    },config);
    //console.log('Config: %o', config);
    var readJsonFile = function (filePath) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    };

    var handleMethod = function (app, method, path, callback) {
        if (method === 'get') {
            app.get(path, callback);
        } else if (method === 'post') {
            app.post(path, callback);
        } else if (method === 'put') {
            app.put(path, callback);
        } else if (method === 'delete') {
            app.delete(path, callback);
        } else {
            throw 'Unknow method type: ' + method;
        }
    };

    var determineHandler = function (method, path, operation, handlers) {
        var operationId = operation.operationId;
        if (operationId && _.has(handlers, operationId)) {
            return handlers[operationId];
        }
        var defaultMethod = _.camelCase(method + '-' + path);
        console.log('Default: ', defaultMethod);
        if (_.has(handlers, defaultMethod)) {
            return handlers[defaultMethod];
        }
        return config.unhandledOperationHandler;
    };


    var determineParams = function (req, spec, pathObject, operation, method) {
        var meta = {};
        var inputPArameters = parameterExtractor.extractInputParameters(req, operation.parameters);
        return _.union([meta], inputPArameters);
    };

    var readSpec = function (inputSpecConfig) {
        return _.isObject(inputSpecConfig) ? inputSpecConfig : readJsonFile(inputSpecConfig);
    };

    var spec = readSpec(config.spec);
    var pathObjects = spec.paths;
    _.forIn(pathObjects, function (pathObject, pathUrl) {
        _.forIn(pathObject, function (operation, method) {
            var path = config.basePath + pathUrl;
            var handler = determineHandler(method, pathUrl, operation, config.handlers);
            var callback = function (req, res, next) {
                try {
                    var resultData = handler.apply(undefined, determineParams(req, spec, pathObject, operation, method));
                    res.json(resultData);
                } catch (e) {
                    var status = _.has(e, 'status') ? e.status : config.defaultExceptionStatus;
                    var message = _.has(e, 'message') ? e.message : config.defaultExceptionMessage;
                    res.status(status).send(message);
                }
            };
            handleMethod(app, method, path, callback);
        });
    });
};