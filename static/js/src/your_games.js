var Auth = require('./authentication.js');

var YourGames = React.createClass({
    getInitialState: function() {
        return {
            games: []
        };
    },
    loadGamesFromServer: function(init){
        if(this.isMounted()){    
            $.get('/api/games/username/' + Auth.getUsername(), function (results) {
                    this.setState({
                        games: results
                    });
            }.bind(this));
        }
    },
    watchGame: function (gameId, e) {
                      e.preventDefault();
                      this.props.history.pushState(null, '/games/' + gameId + '/watch');
                  },
    componentDidMount: function() {
        this.loadGamesFromServer(true);
        setInterval(this.loadGamesFromServer, 3000);
    },
    showModal: function(modalName, e) {
        if (e) {e.preventDefault();}
        $('#' + modalName).modal('show');
    },
    render: function() {
        return (
            <div>
                <h1>Your Games</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Watch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.games.map(function(game) {
                            var key = game._id;
                            var modalName = "modal_" + key;
                            return (<tr key={key}>
                                    <td>{game.name}</td>
                                    { 4 - game.tankIds.length == 0 ? <td>Game Full</td> : <td>Need {4 - game.tankIds.length} more tanks</td> }
                                    { game.status == 1 ? <td><input type="submit" onClick={this.watchGame.bind(this, game._id)} className="btn btn-primary" value="Watch Fight" /></td> : null}
                                    { game.status == -1 ? <td>Compilation Error</td> : null}
                                    { game.status == 0 ? <td>Not Finished</td> : null }
                                    
                                </tr>);
                        }.bind(this))}
                    </tbody>
                </table>

            </div>
    )}
});

module.exports = YourGames;
