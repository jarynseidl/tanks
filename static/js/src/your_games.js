var YourGames = React.createClass({
	uploadText: function (e) {
                      e.preventDefault();
                      $.ajax({
                          success: function(data) {
                              this.props.history.pushState(null, '/arena_home');
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });
                      //TODO: Add code to send the textarea's input to the server. Then display a success or failure.

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
                      <td><input type="submit" className="btn btn-primary" value="Watch Fight" /></td>
                    </tr>
                    <tr>
                      <td>Debbie</td>
                      <td>Waiting for players</td>
                      <td>sally</td>
                      <td><input type="submit" className="btn btn-primary" value="Watch Fight" /></td>
                    </tr>
                  </tbody>
              </table>
            </div>
                    );
    }



});

module.exports = YourGames;
