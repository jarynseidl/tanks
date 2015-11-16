var Login = React.createClass({
    handleSubmit: function (e) {
                      e.preventDefault();
                      var username = this.refs.username.value.trim();
                      $.ajax({
                          url: '/api/users/searchByUsername/' + username,
                          contentType: 'application/json',
                          type: 'GET',
                          success: function(data) {
                              this.props.history.pushState(null, '/user/' + data._id);
                          }.bind(this),
                          error: function(xhr, status, err) {
                                     // Todo: handle no user exception here
                                 }.bind(this)
                      });
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
