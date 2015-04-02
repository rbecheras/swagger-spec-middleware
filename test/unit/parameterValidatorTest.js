define(function (require) {
    var suite = require('intern!object');
    var parameterValidator = require('intern/dojo/node!../../src/parameterValidator');
    var expect = require('intern/chai!expect');


    suite({
        'should validate required when required': function () {
            var errors = parameterValidator.validateInputParameters(
                [

                    undefined

                ],
                [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of pet to use",
                        "required": true,
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                ]
            );
            expect(errors).to.be.not.null;
            expect(errors).is.not.empty;
            expect(errors[0].path).is.equal('id');
            expect(errors[0].value).is.equal(undefined);
            expect(errors[0].msg).is.equal('Field is required');
        },
        'should not validate when not required': function () {
            var errors = parameterValidator.validateInputParameters(
                [

                    undefined

                ],
                [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of pet to use",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                ]
            );
            
            expect(errors).to.be.empty;
        }
    });
});