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
            expect(errors).to.contain({path: 'id', value: undefined, msg: 'Is required'});
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
            
            expect(errors).to.not.contain({path: 'id', value: undefined, msg: 'Is required'});
        }
    });
});