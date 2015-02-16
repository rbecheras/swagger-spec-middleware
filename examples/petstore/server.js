var port = process.env.PORT || 8081;
var express = require('express');
var app = express();

var swaggerSpecMiddleware = require('swagger-spec-middleware');
swaggerSpecMiddleware.host(app, {
    spec: 'petstore.json',
    handlers: {
        'getPets': function(req, resp){
            return 'operation getPets'
        }
    },
    unhandled: function(req, res){
        res.send(200);
    }
});
app.get('/test', function(req, res){
    console.log('hitting test endpoint');
    res.send('test');
});
    

app.listen(port);
console.log('App started on port ' + port);

