define(function (require) {
    var suite = require('intern!object');
    var expect = require('intern/chai!expect');
    var middleware = require('intern/dojo/node!../../src/middleware');


    suite({
        'should throw exception when the spec is invalid': function () {

            var spec = {
                "swagger": "2.0",
                "info": {
                    "version": "1.0.0",
                    "title": "Swagger ToyStore"
                },
                "host": "petstore.swagger.wordnik.com",
                "basePath": "/api",
                "schemes": [
                    "http"
                ],
                "paths": {
                    "/pets": {
                        "non_existing_method": {}
                    }
                }
            }

            var config = {
                spec: spec
            };

            try {
                middleware.host(undefined, config);
            } catch (e) {
                expect(e).is.eql('The Swagger document is invalid...');
            }
        }
    });
});