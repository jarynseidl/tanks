var Auth = require('./authentication.js');

var TankCard = React.createClass({
    render: function() {
        var inArmory = this.props.inArmory;
        var tank = this.props.tank;

        return (
                <div className="tankCard">
                    <div className="tankCardSection1">
                        <h4>{tank.name}</h4>
                        <div>
                            <img className="tankImage" src="../../images/BlueEast.gif"></img>
                        </div>
                    </div>
                    <div className="tankCardSection2">
                        <div className="tankCardStats">
                            <span>Wins:</span>
                            <span>Losses:</span>
                            <span>Tanks killed:</span>
                        </div>
                        <div className="tankCardButton">
                            {inArmory ? 
                                <button type="submit" className="btn btn-primary" value="Download">Download</button>
                                : null
                            }
                            {inArmory ?  
                                <button type="submit" className="btn btn-danger" value="Delete">Delete</button>
                                : null
                            }
                            {!inArmory ?  
                                <button onClick={this.props.joinGame.bind(null, tank)} ontype="submit" className="btn btn-success btn-block">Join Game</button>
                                : null
                            }  
                        </div>
                    </div>
                </div>
        );
    }
});

module.exports = TankCard;

