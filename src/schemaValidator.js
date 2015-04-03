var _ = require('lodash');
var ZSchema = require("z-schema");
var fs = require('fs');

_.each(['byte', 'double', 'float', 'int32', 'int64', 'mime-type', 'uri-template'], function (format) {
    ZSchema.registerFormat(format, function () {
        return true;
    });
});

var validateSchema = function (data, schemas) {
    var validator = new ZSchema();
    var valid = validator.validate(data, schemas);

    var errors = validator.getLastErrors();
    if (!valid) {
        console.log("schema errors: %o", errors);
        throw {
            msg: 'Schema not valid',
            errors: errors
        }
    }
};

var validateSwaggerSchema = function (data) {
    var specSchemaPath = 'node_modules/swagger-schema-official/schema.json';
    var specSchemaAsString = fs.readFileSync(specSchemaPath, 'utf8');
    var schema = JSON.parse(specSchemaAsString);
    validateSchema(data, schema);
};

var precompileSchemaValidatorsForParameter = function (spec, inputParameterSchema) {
    var validator = new ZSchema();
    var schemaValid = validator.validateSchema(spec);
    if (!schemaValid) {
        var errors = validator.getLastErrors();
        console.log(errors);
        throw {
            msg: 'Schema not valid for input parameter',
            errors: errors
        }
    }
    ;
    return function (value) {
        var valid = validator.validate(value, inputParameterSchema);

        if (!valid) {
            var errors = validator.getLastErrors();
            throw {
                msg: 'Input parameter is invalid agains schema',
                value: value,
                schema: inputParameterSchema,
                errors: errors
            }
        }
    }
};

module.exports = {
    validateSchema: validateSchema,
    validateSwaggerSchema: validateSwaggerSchema,
    precompileSchemaValidatorsForParameter: precompileSchemaValidatorsForParameter
};