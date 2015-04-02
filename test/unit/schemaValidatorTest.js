define(function (require) {
    var suite = require('intern!object');
    var schemaValidator = require('intern/dojo/node!../../src/schemaValidator');
    var expect = require('intern/chai!expect');
    var fs = require('intern/dojo/node!fs');

    function validateSpecFile(filePath) {
        var spec = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        schemaValidator.validateAgainstSwaggerSchema(spec);
    }

    suite({
        'should official petstore pass validation': function () {
            validateSpecFile('test/resources/official/petstore.json');
        },
        'should official petstore-expanded pass validation': function () {
            validateSpecFile('test/resources/official/petstore-expanded.json');
        },
        'should official petstore-minimal pass validation': function () {
            validateSpecFile('test/resources/official/petstore-minimal.json');
        },
        'should official petstore-simple pass validation': function () {
            validateSpecFile('test/resources/official/petstore-simple.json');
        },
        'should official petstore-with-external-docs pass validation': function () {
            validateSpecFile('test/resources/official/petstore-with-external-docs.json');
        },
        'should toystore pass schema validation': function () {
            validateSpecFile('test/resources/toyStore.json');
        },
        'should invalidSchema not pass validation': function () {
            validateSpecFile('test/resources/invalidSchemaSpec.json');
            try {
                validateSpecFile('test/resources/invalidSchemaSpec.json');
                expect().fail('invalid shema shoul not pass validation');
            } catch (e) {
                expect(e).not.to.be.null;
            }
        }

    });
});