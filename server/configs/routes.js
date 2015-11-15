var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

module.exports = function(app) {
    var users = require('../controllers/users.js');
    app.get('/api/users', users.findAll);
    app.get('/api/users/:id', users.findById);
    app.post('/api/users', jsonParser, users.add);
    app.put('/api/users/:id', jsonParser, users.update);
    app.delete('/api/users/:id', users.delete);

    var tanks = require('../controllers/tanks.js');
    app.get('/api/users/:userid/tanks', tanks.findAll);
    app.get('/api/users/:userid/tanks/:tankid', tanks.findById);
    app.post('/api/users/:userid/tanks', jsonParser, tanks.add);
    app.put('/api/users/:userid/tanks/:tankid', jsonParser, tanks.update);
    app.delete('/api/users/:userid/tanks/:tankid', tanks.delete);

    var games = require('../controllers/games.js');
    app.get('/api/games/', games.findAll);
    app.get('/api/games/:gameid', games.findById);
    app.post('/api/games', games.add);
    app.post('/api/games/:gameid/tanks', games.addTank);
    app.get('/api/games/:gameid/tanks', games.listTanks);
    app.delete('/api/games/:gameid/tanks/:tankid', games.delete);
}
