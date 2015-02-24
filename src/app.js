var lodash = require('lodash');
module.exports = {
    hello: function (name) {
        console.log(lodash);
        return name === 'Piotr' ? 'Siema' : "Hello, " + name;
    }
};

