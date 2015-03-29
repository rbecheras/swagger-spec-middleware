var _ = require('lodash');
var parameterExtractor = require('./parameterExtractor');


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

var determineHandler = function (method, path, operation, handlers, unhandledOperationHandler) {
    var operationId = operation.operationId;
    if (operationId && _.has(handlers, operationId)) {
        return handlers[operationId];
    }
    var defaultMethod = _.camelCase(method + '-' + path);
    console.log('Default: ', defaultMethod);
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

var buildHandlers = function (app, spec, basePath, handlers, defaultExceptionStatus, defaultExceptionMessage, unhandledOperationHandler) {
    var pathObjects = spec.paths;
    _.forIn(pathObjects, function (pathObject, pathUrl) {
        _.forIn(pathObject, function (operation, method) {
            var path = basePath + pathUrl;
            var handler = determineHandler(method, pathUrl, operation, handlers, unhandledOperationHandler);
            var callback = function (req, res, next) {
                try {
                    var resultData = handler.apply(undefined, determineParams(req, spec, pathObject, operation, method));
                    res.json(resultData);
                } catch (e) {
                    var status = _.has(e, 'status') ? e.status : defaultExceptionStatus;
                    var message = _.has(e, 'message') ? e.message : defaultExceptionMessage;
                    res.status(status).send(message);
                }
            };
            handleMethod(app, method, path, callback);
        });
    });


};


module.exports = {
    buildHandlers: buildHandlers
}