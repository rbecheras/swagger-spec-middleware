var _ = require('lodash');
var parameterValidator = require('./parameterValidator');
var parameterExtractor = require('./parameterExtractor');


var handleOperation = function (app, method, path, callback) {
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

var determineHandler = function (method, path, operation, handlers, unhandledOperationHandler) {
    var operationId = operation.operationId;
    if (operationId && _.has(handlers, operationId)) {
        return handlers[operationId];
    }
    var defaultMethod = _.camelCase(method + '-' + path);
    //console.log('Default: ', defaultMethod);
    if (_.has(handlers, defaultMethod)) {
        return handlers[defaultMethod];
    }
    return unhandledOperationHandler;
};

var determineParams = function (req, spec, pathObject, operation, method) {
    var meta = {};
    var inputPArameters = parameterExtractor.extractInputParameters(req, operation.parameters);
    return _.union([meta], inputPArameters);
};

function buildCallbackForOperation(handler, spec, pathObject, operation, method, defaultExceptionStatus, defaultExceptionMessage) {
    var inputParameterCompiledValidationSchemasValidators = parameterValidator.precompileSchemaValidatorsForParameters(spec, operation);
    //var inputParameterCompiledValidationSchemasValidators = {};
    
    return function (req, res, next) {
        try {
            var handlerParameters = determineParams(req, spec, pathObject, operation, method);

            parameterValidator.assureHandlerParametersValid(handlerParameters, operation.parameters, inputParameterCompiledValidationSchemasValidators);
            
            var resultData = handler.apply(undefined, handlerParameters);
            res.json(resultData);
        } catch (e) {
            console.log('An exception occured: %o', e);
            var status = _.has(e, 'status') ? e.status : defaultExceptionStatus;
            var message = _.has(e, 'message') ? e.message : defaultExceptionMessage;
            res.status(status).send(message);
        }
    };
}

function buildHandlerForPath(pathObject, basePath, pathUrl, handlers, unhandledOperationHandler, spec, defaultExceptionStatus, defaultExceptionMessage, app) {
    _.forIn(pathObject, function (operation, method) {
        var path = basePath + pathUrl;
        var handler = determineHandler(method, pathUrl, operation, handlers, unhandledOperationHandler);
        var callback = buildCallbackForOperation(handler, spec, pathObject, operation, method, defaultExceptionStatus, defaultExceptionMessage);
        handleOperation(app, method, path, callback);
    });
};

function buildHandlersForPaths(pathObjects, basePath, handlers, unhandledOperationHandler, spec, defaultExceptionStatus, defaultExceptionMessage, app) {
    _.forIn(pathObjects, function (pathObject, pathUrl) {
        buildHandlerForPath(pathObject, basePath, pathUrl, handlers, unhandledOperationHandler, spec, defaultExceptionStatus, defaultExceptionMessage, app);
    });
};

var buildHandlersForSpec = function (app, spec, basePath, handlers, defaultExceptionStatus, defaultExceptionMessage, unhandledOperationHandler) {
    var pathObjects = spec.paths;
    buildHandlersForPaths(pathObjects, basePath, handlers,
        unhandledOperationHandler, 
        spec, 
        defaultExceptionStatus, 
        defaultExceptionMessage, 
        app);
};


module.exports = {
    buildHandlersForSpec: buildHandlersForSpec
}