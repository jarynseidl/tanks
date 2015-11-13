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
