var fs = require('fs');
var _ = require('lodash');

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
    } else if (method === 'head') {
        app.options(path, callback);
    } else if (method === 'patch') {
        app.patch(path, callback);
    } else {
        throw 'Unknow method type: ' + method;
    }
};

var unhandledOperationHandler = function (req, res) {
    throw {status: 404, message: 'unhalted operation'};
};

var determineHandler = function (method, path, operation, handlers) {
    var operationId = operation.operationId;
    if (operationId && _.has(handlers, operationId)) {
        return handlers[operationId];
    }
    var defaultMethod = _.camelCase(method + '-' + path);
    if (_.has(handlers, defaultMethod)) {
        return handlers[defaultMethod];
    }
    return unhandledOperationHandler;
};





var determineParams = function (req, spec, pathObject, operation, method) {
    var meta = {};
    var parameterSpec = operation.parameters;
    var handlerInputParameters
    determineInputParameters(req, parameterSpec);
    return [meta];
};

module.exports.host = function (app, config) {
    config = _.merge({
        spec: 'spec.json',
        basePath: '/api',
        handlers: {}
    }, config);
    var spec = readJsonFile(config.spec);
    var pathObjects = spec.paths;
    _.forIn(pathObjects, function (pathObject, pathUrl) {
        _.forIn(pathObject, function (operation, method) {
            var path = config.basePath + pathUrl;
            var handler = determineHandler(method, pathUrl, operation, config.handlers);
            var callback = function (req, res) {
                try {
                    var resultData = handler.apply(undefined, determineParams(req, spec, pathObject, operation, method));
                    res.json(resultData);
                } catch (e) {
                    res.send(e.status);

                }
            };
            handleMethod(app, method, path, callback);
        });
    });
};
