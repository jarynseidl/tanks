var exports = module.exports = {};

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

exports.findAll = function(req, res) {
    Users.find({}, function(err, results) {
        return res.send(results);
    });
};
exports.findByUsername = function() {};
exports.add = function() {};
exports.update = function() {};
exports.delete = function() {};
