var _ = require('lodash');

var requiredParameterValidator = function (value, specParameter, method, operation, pathObject, spec) {
    //console.log('Validating requireness');
    if (specParameter.required === true && _.isUndefined(value)) {
        throw 'Is required'
    }
};

var schemaValidator = function (value, specParameter, method, operation, pathObject, spec) {
    if(specParameter.in === 'body'){
        
    }
};

var validators = [
    requiredParameterValidator,
    schemaValidator
];

var validateParameter = function (value, spec, pathObject, operation, method, specParameter) {
    var errors = [];
    //console.log('Validating parameter: ' + specParameter.name + "= " + value);
    _.forEach(validators, function (validator, index) {
        try {
            validator(value, specParameter, method, operation, pathObject, spec);
        } catch (e) {
            errors.push({path: specParameter.name, value: value, msg: e});
        }
    });

    return errors;
};


var validateInputParameters = function (inputParameters, specParameters, method, operation, pathObject, spec) {
    //console.log('Validating parameters: %o', inputParameters);
    
    var errors = [];
    
    _.forEach(specParameters, function (specParameter, index) {
        var inputParameter = index < inputParameters.length ? inputParameters[index] : undefined;
        var validationResult = validateParameter(inputParameter, spec, pathObject, operation, method, specParameter);
        errors = errors.concat(validationResult);
    });

    return errors;
}

var assureHandlerParametersValid = function (inputParameters, spec, pathObject, operation, method, specParameters) {
    //console.log('Assuring valid parameters');
    var errors = validateInputParameters(inputParameters, spec, pathObject, operation, method, specParameters);
    if (errors.length > 0) {
        throw {msg: 'Input parameters are invalid.', errors:  errors};
    }
};

module.exports = {
    assureHandlerParametersValid: assureHandlerParametersValid,
    validateInputParameters: validateInputParameters
}