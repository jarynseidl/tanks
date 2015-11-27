var exports = module.exports = {};

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

/*
exports.findAll = function(req, res) {
    Users.find({}, function(err, results) {
        return res.send(results);
    });
};

exports.findById = function(req, res) {
    var username = req.params.username;
    Users.findOne({'username':username}, function(err, result) {
        return res.send(result);
    });
};
*/
exports.findByUsername = function(req, res) {
    var username = req.params.username;
    Users.findOne({'username': username}, function(err, result) {
        return res.send(result);
    });
};

/*
exports.add = function(req, res) {
    Users.create(req.body, function (err, user) {
        if (err) return console.log(err);
        return res.send(user);
    });
};

exports.update = function(req, res) {
    var username = req.params.username;
    var updates = req.body;

    Users.update({"username":username}, req.body,
        function (err, numberAffected) {
            if (err) return console.log(err);
            return res.sendStatus(202);
        });
};

exports.delete = function(req, res) {
    var username = req.params.username;
    Users.remove({'username':username}, function(result) {
        return res.send(result);
    });
};
*/
