var Auth = require('./authentication.js');

var Login = React.createClass({
    handleLogout: function (e) {
                      e.preventDefault();
                      Auth.logout(function() {
                          this.props.history.pushState(null, "/");
                      }.bind(this));
                  },
    render: function() {
                return (
                    <a href="#" onClick={this.handleLogout}>Logout </a>
                    );
            }
});
module.exports = Login;
