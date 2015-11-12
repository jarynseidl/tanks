var express = require('express');
var app = express();

// setup static directory
app.use(express.static('app'));

// setup API
app.get('/barber', function(req, res) {
    res.send('Hello Warshington\n');
});
app.get('/barber/:name', function(req, res) {
    res.send({id: 1, name: req.params.name, shop:"lego street"});
});

module.exports = app;

