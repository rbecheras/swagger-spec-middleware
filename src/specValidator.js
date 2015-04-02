var _ = require('lodash');
var schemaValidator = require('./schemaValidator');


/**
 * Validating Swagger spec and throws exception if spec has errors
 * @param spec SwaggerSpec json
 */
var assureSwaggerSpecValid = function (spec) {
    var errors = schemaValidator.getValidationErrorsAgainstSwaggerSchema(spec);
    if(errors === undefined){
        throw {
            msg: 'Spec validation failed',
            errors: errors
        }        
    }
};


module.exports = {
    assureSwaggerSpecValid: assureSwaggerSpecValid
}