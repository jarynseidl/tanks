var exports = module.exports = {}

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

exports.findAll = function(req, res) {
    var userid = req.params.userid;
    Users.findOne({'_id':userid}, function(err, user) {
        return res.send(user.tanks);
    });
};
exports.findById = function(req, res) {
    var userid = req.params.userid;
    var tankid = req.params.tankid;
    Users.findOne({'_id':userid}, function(err, user) {
        return res.send(user.tanks.id(tankid));
    });
};
exports.add = function(req, res) {
    var userid = req.params.userid;
    Users.findOne({'_id':userid}, function(err, user) {
        console.log(req.body);
        user.tanks.push(req.body);
        user.save(function (err) {
            if (!err) return res.sendStatus(202);
        });
    });
};
exports.update = function(req, res) {
    var userid = req.params.userid;
    var tankid = req.params.tankid;
};
exports.delete = function(req, res) {
    var userid = req.params.userid;
    var tankid = req.params.tankid;
};
