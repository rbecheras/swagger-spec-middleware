var _ = require('lodash');
var ZSchema = require("z-schema");
var fs = require('fs');

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

module.exports = {
    validateSchema: validateSchema,
    validateSwaggerSchema: validateSwaggerSchema
};