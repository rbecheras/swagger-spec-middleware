swagger-spec-middleware
========

This is simple middleware for ExpressJS to handle resources given by the Swagger spec file.

# Hello world

```js
var express = require('express');
var app = express();
var swaggerSpecMiddleware = require('swagger-spec-middleware');
swaggerSpecMiddleware.host(app, {
    spec: 'spec.json',
    handlers: {
        'petsGet': function (req, resp) {
            resp.send(200);
        }
    }
});
```

where spec.json:

```js
{
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
            "get": {
                "operationId": "petsGet",
                "responses": {
                    "200": {
                    }
                }
            }
        }
    }
    
}
```

#Documentation
##Installation

Install dependency in the project by:

```
npm install --save swagger-spec-middleware
```

Add to your ExpressJS application and start using it:

```js
var swaggerSpecMiddleware = require('swagger-spec-middleware');
swaggerSpecMiddleware.host(app, {
    spec: 'spec.json',
    handlers: {
        'petsGet': function (req, resp) {
            resp.send(200);
        }
    }
});
```

where spec.json is Swagger specification file with resources description that needs to be handled.

##Handlers
###Default handlers
By default, default handlers are being looking first. When given operation is defined in spec file:

```js
"paths": {
    "/pets": {
        "get": {
            "responses": {
                "200": {
                }
            }
        }
    }
}
```

then this resource can be handled by the default handler ```getPets```:

```js
'getCars': function (req, resp) {
        resp.send(200);
}
```

###Named handlers
Resource can be explicitly named by operationId in spec operation:

```js
"/pets": {
    "get": {
        "operationId": "petsGet",
        "responses": {
            "200": {
            }
        }
    }
}
```

then supported handler for this operation is ```petsGet```.

```js
'petsGet': function (req, resp) {
        resp.send(200);
}
```

OperationId handler overrides default handler. When also ```getPets``` handler specified, only ```petsGet``` will be handled.


##Parameters
If specification declares parameters for the operation, resolved values will be passed as handler arguments in the same order as in spec:

```js
"/pets": {
      "get": {
        "description": "Returns all pets from the system that the user has access to",
        "operationId": "findPets",
        "produces": [
          "application/json",
          "application/xml",
          "text/xml",
          "text/html"
        ],
        "parameters": [
          {
            "name": "tags",
            "in": "query",
            "description": "tags to filter by",
            "required": false,
            "type": "array",
            "items": {
              "type": "string"
            },
            "collectionFormat": "csv"
          },
          {
            "name": "limit",
            "in": "query",
            "description": "maximum number of results to return",
            "required": false,
            "type": "integer",
            "format": "int32"
          }
        ],
        "responses": {
          "200": {
            "description": "pet response",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/pet"
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/errorModel"
            }
          }
        }
      }
      }
```
