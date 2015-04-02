var _ = require('lodash');
var ZSchema = require("z-schema");
var fs = require('fs');

var validateAgainstSchema = function (data, schemas) {
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
}

var validateAgainstSwaggerSchema = function (data) {
    var specSchemaPath = 'node_modules/swagger-schema-official/schema.json';
    var specSchemaAsString = fs.readFileSync(specSchemaPath, 'utf8');
    var schema = JSON.parse(specSchemaAsString);
    validateAgainstSchema(data, schema);
}

module.exports = {
    validateAgainstSchema: validateAgainstSchema,
    validateAgainstSwaggerSchema: validateAgainstSwaggerSchema
}