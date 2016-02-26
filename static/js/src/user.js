var Auth = require('./authentication.js');
var TankList = require('./tanks.js');
var Armory = require('./armory.js');

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
    deleteTank: function (tankId,e) {
        var self = this;
        console.log("Delete tank with id: " + tankId);
        $.ajax({
            url: '/api/users/' + Auth.getUsername() + '/tanks/'+ tankId,
            type: 'DELETE',
            contentType: 'application/json',
            success: function(data) {
                var newArray = $.grep(self.state.user.tanks, function(a) {
                    return a._id !== tankId;
                });
                var modified = self.state.user;
                modified.tanks = newArray;
                self.setState({user: modified, tankCount: modified.tanks.length});
                //self.props.history.pushState(null, '/user/' + Auth.getUsername());
            },
            error: function(xhr, status, err) {
            }
        });
    },
    render: function() {
        return (
            <div className="displayUser">
                <Armory tanks={this.state.user.tanks}/>
            </div>
            )}
});

module.exports = User;