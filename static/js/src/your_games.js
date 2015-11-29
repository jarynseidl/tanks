var YourGames = React.createClass({
	watchGame: function (gameId, e) {
                      e.preventDefault();
                      this.props.history.pushState(null, '/games/' + gameId + '/watch');
                  },
    render: function() {
        return (
            <div>
                <h1>Your Games</h1>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Tank Name</th>
                      <th>Game Status</th>
                      <th>Opponents</th>
                      <th>Watch</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Destoyer</td>
                      <td>Finished</td>
                      <td>sam, jim, sally</td>
                      <td><input type="submit" onClick={this.watchGame.bind(this, "somegameid")} className="btn btn-primary" value="Watch Fight" /></td>
                    </tr>
                    <tr>
                      <td>Debbie</td>
                      <td>Waiting for players</td>
                      <td>sally</td>
                      <td><input type="submit" onClick={this.watchGame.bind(this, "somegameid")} className="btn btn-primary" value="Watch Fight" /></td>
                    </tr>
                  </tbody>
              </table>
            </div>
                    );
    }



});

module.exports = YourGames;
