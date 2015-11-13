var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TankSchema = new Schema({
    name: String,
    code: String
});

var UserSchema = new Schema({
    userName: String,
    password: String,
    tanks: [TankSchema]
});

mongoose.model('Users', UserSchema);
