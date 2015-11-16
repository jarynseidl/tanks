var Register = React.createClass({
    handleSubmit: function(e) {
                      e.preventDefault();
                      $.ajax({
                          url: '/api/users/',
                          contentType: 'application/json',
                          type: 'POST',
                          data: JSON.stringify({
                              'username': this.refs.username.value.trim(),
                              'password': this.refs.password.value.trim()
                          }),
                          processData: false,
                          success: function(data) {
                              this.props.history.pushState(null, '/user/' + data._id);
                          }.bind(this),
                          error: function(xhr, status, err) {
                              console.error('/api/users/', status, err.toString());
                          }.bind(this)
                      });
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
