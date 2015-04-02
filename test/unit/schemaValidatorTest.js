define(function (require) {
    var suite = require('intern!object');
    var schemaValidator = require('intern/dojo/node!../../src/schemaValidator');
    var expect = require('intern/chai!expect');
    var fs = require('intern/dojo/node!fs');

    suite({
        'should petstore pass validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/petstore.json', 'utf8'));
            schemaValidator.validateAgainstSwaggerSchema(spec);
        },
        'should toystore pass schema validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/toyStore.json', 'utf8'));
            schemaValidator.validateAgainstSwaggerSchema(spec);
        },
        'should invalidSchema not pass validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/invalidSchemaSpec.json', 'utf8'));
            try {
                schemaValidator.validateAgainstSwaggerSchema(spec);
                expect().fail('invalid shema shoul not pass validation');
            } catch (e) {
                expect(e).not.to.be.null;
            }
        }

    });
});