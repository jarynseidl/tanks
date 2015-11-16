var Login = require('./login.js');
var Register = require('./register.js');

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Home</h1>
                <Login history={this.props.history} />
                <Register history={this.props.history} />
            </div>
            );
    }
});

module.exports = Home;
