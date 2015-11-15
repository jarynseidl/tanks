var exports = module.exports = {}

var mongoose = require('mongoose');
var Games = mongoose.model('Games');

exports.findAll = function (req, res) {
    Games.find({}, function(err, results) {
        return res.send(results);
    });
};

exports.findById = function (req, res) {
    var gameid = req.params.gameid;
    Games.findById(gameid, function(err, result) {
        return res.send(result);
    });
};

exports.add = function (req, res) {
    Games.create(req.body, function (err, game) {
        if (err) return console.log(err);
        return res.send(game);
    });
};

exports.addTank = function (req, res) {
    var gameid = req.params.gameid;
    Games.findById(gameid, function(err, game) {
        game.tanks.push(req.body);
        game.save(function (err) {
            if (err) return console.log(err);
            return res.sendStatus(202);
        });
    });
};

exports.listTanks = function (req, res) {
    var gameid = req.params.gameid;
    Games.findById(gameid, function(err, game) {
        return res.send(game.tanks);
    });
};

exports.delete = function (req, res) {
    var gameid = req.params.gameid;
    var tankid = req.params.tankid;
    Games.findById(gameid, function(err, game) {
        user.tanks.pull(tankid);
        if (err) return console.log(err);
        return res.sendStatus(202);
    })
};
