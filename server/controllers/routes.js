var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

module.exports = function(app) {
    var users = require('./users.js');
    app.get('/api/users/:username', users.findByUsername);

    var tanks = require('./tanks.js');
    app.get('/api/users/:username/tanks', tanks.findAll);
    app.get('/api/users/:username/tanks/:tankid', tanks.findById);
    app.post('/api/users/:username/tanks', jsonParser, tanks.add);
    app.put('/api/users/:username/tanks/:tankid', jsonParser, tanks.update);
    app.delete('/api/users/:username/tanks/:tankid', tanks.delete);

    var games = require('./games.js');
    app.get('/api/games/', games.findAll);
    app.get('/api/games/open', games.listOpen);
    app.get('/api/games/username/:username', games.findGamesByUsername);
    app.get('/api/games/:gameid', games.findById);
    app.post('/api/games', jsonParser, games.add);
    app.post('/api/games/:gameid/tanks', jsonParser, games.addTank);
    app.get('/api/games/:gameid/tanks', games.listTanks);
    app.delete('/api/games/:gameid/tanks/:tankid', games.delete);

    var auth = require('./authentication.js');
    app.post('/api/users/register', jsonParser, auth.register);
    app.post('/api/users/login', jsonParser, auth.login);
}
