var WatchGame = React.createClass({
    getInitialState: function() {
        return {
            tanks: [
                {"coord" : { "x" : 0, "y" : 0 }, "dir" : "S" },
                {"coord" : { "x" : 9, "y" : 9 }, "dir" : "S" },
                {"coord" : { "x" : 1, "y" : 1 }, "dir" : "N" },
                {"coord" : { "x" : 8, "y" : 8 }, "dir" : "N" }
            ],
            game: {}
        };
    },
     StartGame: function()
     {     
            for(var i = 0; i < this.state.game.moves.listOfMoves.length; i++)
            {
                    for (var j = 0; j < 4; j++)
                    {
                        switch(j){
                            case(0):
                                console.log(this.state.game.moves.listOfMoves[i]['0']);
                            break;
                            case(1):
                                console.log(this.state.game.moves.listOfMoves[i]['1']);
                            break;
                            case(2):
                                console.log(this.state.game.moves.listOfMoves[i]['2']); 
                            break;
                            case(3):
                                console.log(this.state.game.moves.listOfMoves[i]['3']);
                            break;
                        }
                        
                    }
            }
     },
     componentDidMount: function() {
       var pathname = this.props.location.pathname;
       var pieces = pathname.split("/");
       var gameID = pieces[2];
       console.log(gameID);
       
       $.get('/api/games/'+gameID, function (results) {
            this.setState({
                game: results
            }, function() {
              this.StartGame();  
            });
        }.bind(this));
    },
    render: function() {
        var board = new Array(
            new Array(10), new Array(10), new Array(10), new Array(10), new Array(10),
            new Array(10), new Array(10), new Array(10), new Array(10), new Array(10)
            );
        board.forEach(function(ar) {
            for (var i = 0; i < 10; i++) {
                ar[i] = "a";
                ar[i] = undefined;
            }
        });
        this.state.tanks.forEach(function(tank) {
            var image_url = "TankUp.png";
            if (tank.dir === "S") {
                image_url = "TankDown.png";
            } else if (tank.dir === "N") {
                image_url = "TankUp.png";
            } else if (tank.dir === "E") {
                image_url = "TankRight.png";
            } else if (tank.dir === "W") {
                image_url = "TankLeft.png";
            }
            image_url = '/images/' + image_url;
            board[tank.coord.y][tank.coord.x] = image_url;
        });
        return (
            <div>
                <h1>Watch Game</h1>
                <table className="gameBoard"><tbody>
                        {board.map(function (row) {
                            return (
                                <tr>
                                    {row.map(function (cell) {
                                        var image_url = "/images/Blank.png";
                                        if (cell) {
                                            image_url = cell;
                                        }
                                        return (<td><img height="50" width="50" src={image_url} /></td>);
                                    })}
                                </tr>);
                        })}
                </tbody></table>
            </div>
    )}
});

module.exports = WatchGame;
