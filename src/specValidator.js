var _ = require('lodash');
var swaagerTools = require('swagger-tools').specs.v2;


var validationCallback = function (err, result) {
    if (err) {
        throw err;
    }

    if (typeof result !== 'undefined') {
        if (result.errors.length > 0) {
            console.log('The Swagger document is invalid...');

            console.log('');

            console.log('Errors');
            console.log('------');

            result.errors.forEach(function (err) {
                console.log('#/' + err.path.join('/') + ': ' + err.message);
            });

            console.log('');
        }

        if (result.warnings.length > 0) {
            console.log('Warnings');
            console.log('--------');

            result.warnings.forEach(function (warn) {
                console.log('#/' + warn.path.join('/') + ': ' + warn.message);
            });
        }

        if (result.errors.length > 0) {
            throw 'The Swagger document is invalid...';
        }
    } else {
        console.log('Swagger document is valid');
    }
}

/**
 * Validating Swagger spec and throws exception if spec has errors
 * @param spec SwaggerSpec json
 */
var assureSwaggerSpecValid = function (spec) {
    swaagerTools.validate(spec, validationCallback);
};


module.exports = {
    assureSwaggerSpecValid: assureSwaggerSpecValid
}