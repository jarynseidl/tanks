var Auth = require('./authentication.js');

var Login = React.createClass({
    handleSubmit: function (e) {
                      e.preventDefault();
                      var username = this.refs.username.value.trim();
                      var password = this.refs.password.value.trim();
                      Auth.login(username, password, function(success) {
                          if (success) {
                              this.props.history.pushState(null, '/user/' + Auth.getUsername());
                          } else {
                              alert('I don\'t think you be gottin gud cradenshals. Why don\'t u try dat one mor time.');
                          }
                      }.bind(this));
                  },
    render: function() {
                return (
                    <div className="registerUser">
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <span className="input-group-addon">Username:</span>
                                <input ref="username" type="text" className="form-control" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">Password:</span>
                                <input ref="password" type="password" className="form-control" />
                            </div>
                            <div className="input-group">
                                <input type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                    </div>
                    );
            }
        });
module.exports = Login;
