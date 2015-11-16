var User = React.createClass({
    getInitialState: function() {
        return {
            username: "",
            tankCount: 0
        }; 
    },
    componentDidMount: function() {
        $.get('/api/users/' + this.props.params.userId, function(result) {
            this.setState({
                username: result["username"],
                tankCount: result["tanks"].length
            });
        }.bind(this));
    },
    render: function() {
        return (
            <div className="displayUser">
                <h1>User</h1>
                <h4>Id: {this.state.username}</h4>
                <h4>Tanks: {this.state.tankCount}</h4>
            </div>
            )}
});

module.exports = User;
