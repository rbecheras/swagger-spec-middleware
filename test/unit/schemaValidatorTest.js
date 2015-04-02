define(function (require) {
    var suite = require('intern!object');
    var schemaValidator = require('intern/dojo/node!../../src/schemaValidator');
    var expect = require('intern/chai!expect');
    var fs = require('intern/dojo/node!fs');

    suite({
        'should official petstore pass validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/official/petstore.json', 'utf8'));
            schemaValidator.validateAgainstSwaggerSchema(spec);
        },
        'should official petstore-expanded pass validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/official/petstore-expanded.json', 'utf8'));
            schemaValidator.validateAgainstSwaggerSchema(spec);
        },
        'should official petstore-minimal pass validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/official/petstore-minimal.json', 'utf8'));
            schemaValidator.validateAgainstSwaggerSchema(spec);
        },
        'should official petstore-simple pass validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/official/petstore-simple.json', 'utf8'));
            schemaValidator.validateAgainstSwaggerSchema(spec);
        },
        'should official petstore-with-external-docs pass validation': function () {
            var spec = JSON.parse(fs.readFileSync('test/resources/official/petstore-with-external-docs.json', 'utf8'));
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