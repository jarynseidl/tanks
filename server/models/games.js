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

var GameSchema = new Schema({
    name: String,
    log: {messages: [GameMessage]},
    users: [GameUser],
    tanks: [GameTank],
    tankIds: [ObjectId],
    board: [[String]],
    ready: Boolean
})

mongoose.model('Games', GameSchema);
