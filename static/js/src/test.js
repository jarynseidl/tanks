var Auth = require('./authentication.js');
var Editor = require('./code_editor.js');
var TankList = require('./tanks.js')

var Test = React.createClass({
    getInitialState: function() {
        return {
            user: {tanks: []},
            username: "",
            tankCount: 0,
            selectedTank: null
        };
    },
    handleSelectTank: function(tank) {
        this.setState({selectedTank: tank});
        console.log("TANK: " + tank);
        console.log(this.state.selectedTank);
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
            <div>
                <div className="col-md-4">
                    <TankList tanks={this.state.user.tanks} onSelectTank={this.handleSelectTank}/>
                </div>
                <div className="col-md-4">
                    <Editor />
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }
});

module.exports = Test;
