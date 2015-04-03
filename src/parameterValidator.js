var _ = require('lodash');
var schemaValidator = require('./schemaValidator');

var validateParameter = function (value, specParameter, inputParameterCompiledValidationSchemasValidator) {
    //console.log('Validating parameter: ' + specParameter.name + "= " + value);

    var errors = [];
    var parameterName = specParameter.name;

    var failedRequiredCondition = specParameter.required === true && _.isUndefined(value);
    if (failedRequiredCondition) {
        errors.push({path: parameterName, value: value, msg: 'Field is required'});
        return errors;
    }

    if (specParameter.in === 'body') {
        if (inputParameterCompiledValidationSchemasValidator == null) {
            errors.push({
                path: parameterName,
                value: value,
                msg: 'Schema is required when in parameter is set as body'
            });
            return errors;
        }
        var schemaValidationErrors = inputParameterCompiledValidationSchemasValidator(value);
        errors = errors.concat(schemaValidationErrors);
    }

    return errors;
};


var validateInputParameters = function (inputParameters, specParameters, inputParameterCompiledValidationSchemasValidators) {
    //console.log('Validating parameters: %o', inputParameters);

    var errors = [];

    _.forEach(specParameters, function (specParameter, index) {
        var parameterName = specParameter.name;
        var inputParameterValue = index < inputParameters.length ? inputParameters[index] : undefined;
        var inputParameterCompiledValidationSchemasValidator = inputParameterCompiledValidationSchemasValidators ? inputParameterCompiledValidationSchemasValidators[parameterName] : undefined;

        var validationResult = validateParameter(inputParameterValue, specParameter, inputParameterCompiledValidationSchemasValidator);
        errors = errors.concat(validationResult);
    });

    return errors;
}

var assureHandlerParametersValid = function (inputParameters, specParameters, inputParameterCompiledValidationSchemasValidators) {
    //console.log('Assuring valid parameters');
    var errors = validateInputParameters(inputParameters, specParameters, inputParameterCompiledValidationSchemasValidators);
    if (errors.length > 0) {
        throw {msg: 'Input parameters are invalid.', errors: errors};
    }
};



/**
 * Creates schema validators for input parameters for given operation
 * @param spec
 * @param operation
 */
var precompileSchemaValidatorsForParameters = function (spec, operation) {
    var out = {};
    var parameters = operation.parameters;

    if (parameters == null) {
        return out;
    }

    _.forEach(parameters, function (inputParameter) {
        var inputParameterSchema = inputParameter.schema;
        if (inputParameterSchema != null) {
            out[inputParameter.name] = schemaValidator.precompileSchemaValidatorsForParameter(spec, inputParameterSchema);
        }
    });

    return out;
}

module.exports = {
    assureHandlerParametersValid: assureHandlerParametersValid,
    validateInputParameters: validateInputParameters,
    precompileSchemaValidatorsForParameters: precompileSchemaValidatorsForParameters
};