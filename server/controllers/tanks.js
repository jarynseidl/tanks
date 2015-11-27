var exports = module.exports = {}

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

exports.findAll = function(req, res) {
    var username = req.params.username;
    Users.findOne({'username':username}, function(err, user) {
        return res.send(user.tanks);
    });
};

exports.findById = function(req, res) {
    var username = req.params.username;
    var tankid = req.params.tankid;
    Users.findOne({'username':username}, function(err, user) {
        return res.send(user.tanks.id(tankid));
    });
};

exports.add = function(req, res) {
    var username = req.params.username;
    Users.findOne({'username':username}, function(err, user) {
        user.tanks.push(req.body);
        user.save(function (err) {
            if (!err) return res.sendStatus(202);
        });
    });
};

exports.update = function(req, res) {
    var username = req.params.username;
    var tankid = req.params.tankid;
    Users.findById(username, function(err, user) {
        var tank = user.tanks.id(tankid);

        Object.keys(req.body).forEach(function(key){
            tank[key] = req.body[key];
        });

        user.save(function(err) {
            if(!err) return res.sendStatus(202);
            return console.log(err);
        });
    });
};

exports.delete = function(req, res) {
    var username = req.params.username;
    var tankid = req.params.tankid;
    Users.findById(username, function(err, user) {
        if (err) return console.log(err);
        user.tanks.pull(tankid);
        user.save( function(err) {
            if (!err) return res.sendStatus(202);
            return console.log(err);
        });
    });
};
