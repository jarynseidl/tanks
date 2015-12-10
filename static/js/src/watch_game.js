var WatchGame = React.createClass({
    getInitialState: function() {
        return {
            tanks: [
                {"coord" : { "x" : 0, "y" : 0 }, "dir" : "S", "visible" : true},
                {"coord" : { "x" : 9, "y" : 9 }, "dir" : "N", "visible" : true},
                {"coord" : { "x" : 8, "y" : 1 }, "dir" : "N", "visible" : true},
                {"coord" : { "x" : 1, "y" : 8 }, "dir" : "S", "visible" : true}
            ],
            game: {}
        };
    },
    StartGame: function()
     {     
            this.makeMove(0,0)
     },
     
     makeMove: function(index1, index2)
     {
            if(index1 >= this.state.game.moves.listOfMoves.length){
                return;}
                
                       console.log("Moving!");
                       console.log("index1: " + index1 + ". Index2: " +index2);
                       switch(index2){
                            case(0):
                                switch(this.state.game.moves.listOfMoves[index1]['0']){
                                    case("TURN_RIGHT"):
                                    console.log("Turning right!");
                                      switch(this.state.tanks[0].dir){
                                          case("S"):
                                            this.state.tanks[0].dir = "W";
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[0].dir = "E";
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[0].dir = "N";
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[0].dir = "S";
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("TURN_LEFT"):
                                    console.log("Turning left!");
                                        switch(this.state.tanks[0].dir){
                                            case("S"):
                                                this.state.tanks[0].dir = "E";
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[0].dir = "W";
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[0].dir = "S";
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[0].dir = "N";
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                    case("MOVE_FORWARD"):
                                    console.log("Moving Forward!");
                                        switch(this.state.tanks[0].dir){
                                          case("S"):
                                            this.state.tanks[0].coord.y+=1;
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[0].coord.y-=1;
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[0].coord.x-=1;
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[0].coord.x+=1;
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("MOVE_BACKWARD"):
                                    console.log("Moving Backward");
                                        switch(this.state.tanks[0].dir){
                                            case("S"):
                                                this.state.tanks[0].coord.y-=1;
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[0].coord.y+=1;
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[0].coord.x+=1;
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[0].coord.x-=1;
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                }
                            break;
                            case(1):
                            switch(this.state.game.moves.listOfMoves[index1]['1']){
                                    case("TURN_RIGHT"):
                                    console.log("Turning right!");
                                      switch(this.state.tanks[1].dir){
                                          case("S"):
                                            this.state.tanks[1].dir = "W";
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[1].dir = "E";
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[1].dir = "N";
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[1].dir = "S";
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("TURN_LEFT"):
                                    console.log("Turning left!");
                                        switch(this.state.tanks[1].dir){
                                            case("S"):
                                                this.state.tanks[1].dir = "E";
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[1].dir = "W";
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[1].dir = "S";
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[1].dir = "N";
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                    case("MOVE_FORWARD"):
                                    console.log("Moving Forward!");
                                        switch(this.state.tanks[1].dir){
                                          case("S"):
                                            this.state.tanks[1].coord.y+=1;
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[1].coord.y-=1;
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[1].coord.x-=1;
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[1].coord.x+=1;
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("MOVE_BACKWARD"):
                                        switch(this.state.tanks[1].dir){
                                            case("S"):
                                                this.state.tanks[1].coord.y-=1;
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[1].coord.y+=1;
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[1].coord.x+=1;
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[1].coord.x-=1;
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                }
                            break;
                            case(2):
                                switch(this.state.game.moves.listOfMoves[index1]['2']){
                                    case("TURN_RIGHT"):
                                    console.log("Turning right!");
                                      switch(this.state.tanks[2].dir){
                                          case("S"):
                                            this.state.tanks[2].dir = "W";
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[2].dir = "E";
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[2].dir = "N";
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[2].dir = "S";
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("TURN_LEFT"):
                                    console.log("Turning left!");
                                        switch(this.state.tanks[2].dir){
                                            case("S"):
                                                this.state.tanks[2].dir = "E";
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[2].dir = "W";
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[2].dir = "S";
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[2].dir = "N";
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                    case("MOVE_FORWARD"):
                                    console.log("Moving Forward!");
                                        switch(this.state.tanks[2].dir){
                                          case("S"):
                                            this.state.tanks[2].coord.y+=1;
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[2].coord.y-=1;
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[2].coord.x-=1;
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[2].coord.x+=1;
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("MOVE_BACKWARD"):
                                    console.log("Moving Backward");
                                        switch(this.state.tanks[2].dir){
                                            case("S"):
                                                this.state.tanks[2].coord.y-=1;
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[2].coord.y+=1;
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[2].coord.x+=1;
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[2].coord.x-=1;
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                } 
                            break;
                            case(3):
                                switch(this.state.game.moves.listOfMoves[index1]['3']){
                                    case("TURN_RIGHT"):
                                    console.log("Turning right!");
                                      switch(this.state.tanks[3].dir){
                                          case("S"):
                                            this.state.tanks[3].dir = "W";
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[3].dir = "E";
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[3].dir = "N";
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[3].dir = "S";
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("TURN_LEFT"):
                                    console.log("Turning left!");
                                        switch(this.state.tanks[3].dir){
                                            case("S"):
                                                this.state.tanks[3].dir = "E";
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[3].dir = "W";
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[3].dir = "S";
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[3].dir = "N";
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                    case("MOVE_FORWARD"):
                                    console.log("Moving Forward!");
                                        switch(this.state.tanks[3].dir){
                                          case("S"):
                                            this.state.tanks[3].coord.y+=1;
                                            this.forceUpdate();
                                          break;
                                          case("N"):
                                            this.state.tanks[3].coord.y-=1;
                                            this.forceUpdate();
                                          break
                                          case("W"):
                                            this.state.tanks[3].coord.x-=1;
                                            this.forceUpdate();
                                          break;
                                          case("E"):
                                            this.state.tanks[3].coord.x+=1;
                                            this.forceUpdate();
                                          break;
                                      }
                                    break;
                                    case("MOVE_BACKWARD"):
                                    console.log("Moving Backward");
                                        switch(this.state.tanks[3].dir){
                                            case("S"):
                                                this.state.tanks[3].coord.y-=1;
                                                this.forceUpdate();
                                            break;
                                            case("N"):
                                                this.state.tanks[3].coord.y+=1;
                                                this.forceUpdate();
                                            break
                                            case("W"):
                                                this.state.tanks[3].coord.x+=1;
                                                this.forceUpdate();
                                            break;
                                            case("E"):
                                                this.state.tanks[3].coord.x-=1;
                                                this.forceUpdate();
                                            break;
                                        }
                                    break;
                                }
                            break;
                        }
            
            
            //check to see if the next tank in line exists, if not push it to the next tank and run again - this way we're not waiting. 
            if(index2 != 3){
                index2 ++;
            }
            
            else{
                index2 = 0;
                index1++;
            }
            
            var exists = false;
            while(!exists)
            {
                switch(index2)
                {
                    case(0):
                        if(this.state.game.moves.listOfMoves[index1]['0']){
                            exists = true;}
                        else{
                            this.state.tanks[0].visible = false;
                            index2++;
                            }     
                    break;
                    case(1):
                        if(this.state.game.moves.listOfMoves[index1]['1']){
                            exists = true;}
                        else{
                            this.state.tanks[1].visible = false;
                            index2++;
                            }     
                    break;
                    case(2):
                        if(this.state.game.moves.listOfMoves[index1]['2']){
                            exists = true;}
                        else{
                            this.state.tanks[2].visible = false;
                            index2++;
                            }   
                    break;
                    case(3):
                         if(this.state.game.moves.listOfMoves[index1]['3']){
                            exists = true;}
                        else{
                            this.state.tanks[3].visible = false;
                            index2 =0;
                            index1++;
                            }   
                    break;
                }
            }              
            
            if (!window.location.href.split("/")[6].split("?")[0] == "watch"){
                return;
            }
                
            setTimeout(function(){
                this.makeMove(index1,index2);
            }.bind(this),500);
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
            
            image_url = "TankUp.png";
            if (!tank.visible){
                image_url = "Blank.png";
            } else if (tank.dir === "S") {
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
