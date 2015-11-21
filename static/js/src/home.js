var Login = require('./login.js');
var Register = require('./register.js');

var Home = React.createClass({
	getStarted: function (e) {
                      e.preventDefault();
                      console.log(e)
                      $.ajax({
                          success: function(data) {
                              this.props.history.pushState(null, '/get_started');
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });
                  },
    render: function() {
        return (
            <div>
            	<h1>Home</h1>
           		<p>Welcome to our online tank arena! On this website you will be able to upload and battle 
            		tanks that you have programmed against other users. Using our interface, you will be 
            		able to code up a tank of your very own in no time. For more information on how to get started,
            		click the link below.
            	</p>
            	<form onClick={this.getStarted}>
                    <div className="input-group">
                        <input type="submit" className="btn btn-primary" value="Get Started" />
                    </div>
                </form>
                <Login history={this.props.history} />
                <Register history={this.props.history} />

            </div>
            );
    }
});

module.exports = Home;
