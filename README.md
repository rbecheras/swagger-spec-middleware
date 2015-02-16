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
##Default handlers
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

##Named handlers
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