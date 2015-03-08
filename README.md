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


##Operations
Framework supports following operation:

* get
* post
* put
* delete

##Parameters
If specification declares parameters for the operation, resolved values will be passed as handler arguments in the same order as in spec. For example if ```tags``` and ```limit``` parameter are specified as follow: 

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
            "name": "tag",
            "in": "query",
            "type": "string"
          },
          {
            "name": "limit",
            "in": "query",
            "type": "integer",
            "format": "int32"
          }
        ],
        "responses": {
          "200": {
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

then in handler they will be passed after meta object:

```js
swaggerSpecMiddleware.host(app, {
    spec: 'spec.json',
    handlers: {
        getPets: function(meta, tags, limit){
            return {
                tags: tags,
                limit: limit
            }
        }
    }

});
```

### Parameter inputs:
Framework supports following parameter input sources:

* query
* heade
* path
* formData
* body

### Parameter types and formats:
Parameters are automatically converted to target types as follow:

|Common Name|type           |format        |Comments                         |
|-----------|:-------------:|-------------:|--------------------------------:|
|integer    |integer        |int32         |signed 32 bits                   |
|long       |integer        |int64         |signed 64 bits                   |
|float      |number         |float         |                                 |
|double     |number         |double        |                                 |
|boolean    |boolean        |              |                                 |
|string     |string         |              |                                 |
|byte       |string         |byte          |                                 |
|date       |string         |date          |As defined by full-date - RFC3339|
|dateTime   |string         |date-time     |As defined by date-time - RFC3339|