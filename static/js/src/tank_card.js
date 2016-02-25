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
                    <div className="tankCardStats">
                        <h4>Stats:</h4>
                        <span>Won:</span>
                        <span>Lost:</span>
                        <span>Kills:</span>
                    </div>
                    <div className="buttonSection">
                            {inArmory ? 
                                <button type="submit" className="btn btn-primary tankCardButton">Upload</button>
                                : null
                            }
                            {inArmory ?  
                                <button type="submit" className="btn btn-danger tankCardButton">Download</button>
                                : null
                            }
                            {!inArmory ?  
                                <button onClick={this.props.joinGame.bind(null, tank)} ontype="submit" className="btn btn-success tankCardButton">Join!</button>
                                : null
                            } 
                            
                            
                    </div>
                </div>
        );
    }
});

module.exports = TankCard;

