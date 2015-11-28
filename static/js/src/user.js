var Auth = require('./authentication.js');
var TankList = require('./tanks.js');

var User = React.createClass({
    getInitialState: function() {
        return {
            user: {tanks: []},
            username: "",
            tankCount: 0
        }; 
    },
    componentDidMount: function() {
        $.get('/api/users/' + Auth.getUsername(), function(result) {
            this.setState({
                user: result,
                username: result["username"],
                tankCount: result["tanks"].length
            });
        }.bind(this));
    },
    render: function() {
        return (
            <div className="displayUser">
                <h1>{this.state.username} - ({this.state.tankCount} tanks)</h1>
                <TankList tanks={this.state.user.tanks} />
            </div>
            )}
});

module.exports = User;
