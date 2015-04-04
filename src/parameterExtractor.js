var _ = require('lodash');
var parameterConverter = require('./parameterConverter');
var arrayTransformator = require('./arrayTransformator');


/**
 * Extracting parameter by method type
 * @param req
 * @param parameterSpec, where:
 *  - parameterName
 *  - parameterMethodType allowed values: "query", "header", "path" or "body"
 */
var extractInputParameterByMethodType = function (req, parameterSpec) {
    var parameterName = parameterSpec.name, 
        parameterMethodType = parameterSpec.in,
        collectionFormat = parameterSpec.collectionFormat;
    
    if (parameterMethodType === 'query') {
        var out = req.query[parameterName];
        console.log('out: $j', out);
        return collectionFormat !== 'multi' && _.isArray(out) ? arrayTransformator.join(out, collectionFormat) : out;
    }
    if (parameterMethodType === 'header') {
        return req.header(parameterName);
    }
    if (parameterMethodType === 'path') {
        return req.path(parameterName);
    }
    if (parameterMethodType === 'body') {
        return req.body[parameterName];
    }
    throw 'Unsupported parameter method type: ' + parameterMethodType + ', for parameter: ' + parameterName;
};
/**
 * Returns input parameter value based on request and parameter specification object. Example input:
 <pre> {
   "name": "limit",
   "in": "query",
   "description": "maximum number of results to return",
   "required": false,
   "type": "integer",
   "format": "int32"
 }</pre>
 * @param req
 * @param parameterSpec parameters spec object
 *
 * @returns {Object}
 */

var extractInputParameter = function (req, parameterSpec) {
    var parameterOriginalValue = extractInputParameterByMethodType(req, parameterSpec);
    if(parameterOriginalValue == null){
        return parameterOriginalValue;
    }
    var parameterConvertedValue = parameterConverter.convert(parameterOriginalValue, parameterSpec);
    return parameterConvertedValue;
};

/**
 * Returns input parameters value based on request and parameter specification array. Example input:
 <pre> [{
   "name": "limit",
   "in": "query",
   "description": "maximum number of results to return",
   "required": false,
   "type": "integer",
   "format": "int32"
 },{
   "name": "name",
   "in": "query",
   "description": "query filter",
   "required": false,
   "type": "string"
 }]</pre>
 * @param req
 * @param parameterSpec parameters spec array
 *
 * @returns {Array}
 */
var extractInputParameters = function (req, parametersSpec) {
    var out = [];
    _.forIn(parametersSpec, function (parameterSpec) {
        out.push(extractInputParameter(req, parameterSpec));
    });
    return out;
};

module.exports = {
    extractInputParameter: extractInputParameter,
    extractInputParameters: extractInputParameters
}