var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tanks = require('./tanks.js');

var UserSchema = new Schema({
    username: String,
    password: String,
    //tanks: [Tanks]
    tanks: [{name: String, code: String}]
});

mongoose.model('Users', UserSchema);
