module.exports = function(app) {
    var users = require('./controllers/users');
    app.get('/users', users.findAll);
    app.get('/users/:username', users.findByUsername);
    app.post('/users', users.add);
    app.put('/users/:username', users.update);
    app.delete('/users/:username', users.delete);
}
