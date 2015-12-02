var Auth = require('./authentication.js');

var Register = React.createClass({
    handleSubmit: function(e) {
                      e.preventDefault();
                      var username = this.refs.username.value.trim();
                      var password = this.refs.password.value.trim();
                      Auth.register(username, password, function(success) {
                          debugger;
                          if (success) {
                              debugger;
                              this.props.history.pushState(null, '/user/' + Auth.getUsername());
                          } else {
                              alert('oops there was kind of a little problem with you registering. Maybe try again?');
                          }
                      }.bind(this));
                  },
    render: function() { 
                return (
                        <div className="registerUser">
                            <h1>Register User</h1>
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
                                    <input type="submit" className="btn btn-primary" value="Register" />
                                </div>
                            </form>
                        </div>
                       )
            }
});

module.exports = Register;
