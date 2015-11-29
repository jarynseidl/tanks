var WatchGame = React.createClass({
    getInitialState: function() {
        return {
            tanks: [
                {"coord" : { "x" : 0, "y" : 0 }, "dir" : "S" },
                {"coord" : { "x" : 1, "y" : 0 }, "dir" : "E" },
                {"coord" : { "x" : 5, "y" : 5 }, "dir" : "N" },
                {"coord" : { "x" : 3, "y" : 0 }, "dir" : "S" }
            ]
        };
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
