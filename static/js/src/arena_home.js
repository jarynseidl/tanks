var Auth = require('./authentication.js');

var ArenaHome = React.createClass({
	addTank: function (e) {
                      e.preventDefault();
                      $.ajax({
                          success: function(data) {
                              this.props.history.pushState(null, '/upload_tank');
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });
                  },
    seeGames: function (e) {
                      e.preventDefault();
                      $.ajax({
                          success: function(data) {
                              this.props.history.pushState(null, '/your_games');
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });
                  },
    userProfile: function (e) {
                     e.preventDefault();
                     this.props.history.pushState(null, '/user/' + Auth.getUsername());
                 },
    joinGames: function (e) {
                     e.preventDefault();
                     this.props.history.pushState(null, '/games');
                 },
    render: function() {
        return (
            <div className="registerUser">
                <h1>Arena Home</h1>
                <form onClick={this.userProfile}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="View your tanks" />
                    </div>
                </form>
                <form onClick={this.addTank}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="Upload a New Tank" />
                    </div>
                </form>
                <form onClick={this.joinGames}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="Join a Fight" />
                    </div>
                </form>
                <form onClick={this.seeGames}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="See Your Games" />
                    </div>
                </form>
                <form onClick={this.addTank}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="Edit Your Tanks" />
                    </div>
                </form>
             </div>
             //Can we just put a switch statement in the onClick function or do we need a different function for each button?
        );
    }
});

module.exports = ArenaHome;
