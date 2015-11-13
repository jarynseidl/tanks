var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var GameMessage = new Schema({
    userName: String,
    message: String
});

var GameUser = new Schema({
    userId: ObjectId,
    userName: String,
    tankName: String,
    tankId: ObjectId
});

var GameCoord = new Schema({
    x: Number,
    y: Number
});

var GameTank = new Schema({
    coord: GameCoord,
    tankId: ObjectId,
    tankName: String
});

var Game = new Schema({
    log: {messages: [GameMessage]},
    users: [GameUser],
    tanks: [GameTank],
    board: [[String]],
})
