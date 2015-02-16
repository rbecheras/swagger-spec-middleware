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

var unhandledOperationHandler = function(req, res){
    res.send(404);
};

var determineHandler = function(method, path, operation, handlers){
    var operationId = operation.operationId;
    if(operationId && _.has(handlers, operationId)){
        return handlers[operationId];
    }
    var defaultMethod = _.camelCase(method+'-'+path);
    if(_.has(handlers, defaultMethod)){
        return handlers[defaultMethod];
    }
    return unhandledOperationHandler;
};

module.exports.host = function (app, config) {
    config = _.merge({
        spec: 'spec.json',
        basePath: '/api',
        handlers: {}
    }, config);
    var spec = readJsonFile(config.spec); 
    var pathObjects = spec.paths;
//    var paths = _.keys(pathObjects);
//    console.log('hosting: %j', pathObjects);
    _.forIn(pathObjects, function (pathObject, pathUrl) {
//        console.log('handling path: %j', pathUrl);
        _.forIn(pathObject, function (operation, method) {
//            console.log('handling %j %j', method, operation);
            var path = config.basePath + pathUrl;
            var callback = function (req, res) {
//                console.log('calling: %j %j', method, path);
                
                determineHandler(method, pathUrl, operation, config.handlers)(req, res);
//                res.json({status: 'implemented, method: ', 'method':  method, operation: operation});
            };
            handleMethod(app, method, path, callback);
        });
    });
};
