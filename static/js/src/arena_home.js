var ArenaHome = React.createClass({
	handleClick: function (e) {
                      e.preventDefault();
                      console.log(e)
                      $.ajax({
                          success: function(data) {
                              this.props.history.pushState(null, '/upload_tank');
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });
                  },
    render: function() {
        return (
            <div className="registerUser">
                <h1>Arena Home</h1>
                <form onClick={this.handleClick}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="Upload a New Tank" />
                    </div>
                </form>
                <form onClick={this.handleClick}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="Join a Fight" />
                    </div>
                </form>
                <form onClick={this.handleClick}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="See Your Games" />
                    </div>
                </form>
                <form onClick={this.handleClick}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="See Current Game" />
                    </div>
                </form>
                <form onClick={this.handleClick}>
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
