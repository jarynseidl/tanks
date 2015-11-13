// Import the users model
require('./models/users');

// setup Express
var app = require('./models/express.js');

// setup routes
var routes = require('./models/routes.js');
routes(app);

// setup Mongo connection
var mongoose = require('mongoose');
var fs = require('fs');
var mongoUri = 'mongodb://127.0.0.1:27017/tanks';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + mongoUri);
});
db.once('open', function () {
    console.log("Connected to mongodb");
});

// start the server
var server = app.listen(3000, function() {
    console.log("Started on port 3000");
    var host = server.address().address;
    var port = server.address().port;
});
