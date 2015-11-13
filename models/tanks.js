var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TankSchema = new Schema({
    name: String,
    code: String
});

module.exports.Tanks = TankSchema;
