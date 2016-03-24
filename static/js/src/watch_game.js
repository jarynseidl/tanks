var Auth = require('./authentication.js')

var WatchGame = React.createClass({
    getInitialState: function() {
        return {
            tanks: [
                {"coord" : { "x" : 0, "y" : 0 }, "dir" : "S", "visible" : true, "index": 0, "name": ""},
                {"coord" : { "x" : 9, "y" : 9 }, "dir" : "N", "visible" : true, "index": 1, "name": ""},
                {"coord" : { "x" : 8, "y" : 1 }, "dir" : "N", "visible" : true, "index": 2, "name": ""},
                {"coord" : { "x" : 1, "y" : 8 }, "dir" : "S", "visible" : true, "index": 3, "name": ""}
            ],
            game: {},
            tanksLeft: 4,
            lasers: [],
            TURN_LENGTH: 350
        };
    },
    getWinner: function()
    {
        for(var i = 0; i < 4; i++)
        {
            if(this.state.game.users[i].userID == this.state.game.winnerID){
                return this.state.game.users[i].userName;
            }
        }
    },
    backToViewGames: function()
    {
        this.props.history.pushState(null, '/your_games');
    },
    DisplayWinner: function()
    {
        console.log("There's a winner!");
        var winningUser= this.getWinner();
        if(winningUser == Auth.getUsername()){
            swal({
                title: "Congratulations!",
                text: "You suck the least!",
                type: "success",
                closeOnConfirm: true
            },
            function()
            {
                this.backToViewGames();
            }.bind(this));
        }
        else
        {
            swal({
                title: "Bummer dude.",
                text: "Well.... you tried. ",
                type: "error",
                imageUrL: "\images\failure.png",
                closeOnConfirm: true
            },
            function()
            {
                this.backToViewGames();
            }.bind(this));
        }

    },

    hasTank: function(x,y){
      for(var i = 0; i < 4; i++)
      {
          if (this.state.tanks[i].coord.x == x && this.state.tanks[i].coord.y == y && this.state.tanks[i].visible == true)
          {
             return true;
          }
      }
      return false;
    },

    fire: function(tankNo)
    {
        var tempLasers = [];
        switch(this.state.tanks[tankNo].dir){
            case("S"):
                for(var y = this.state.tanks[tankNo].coord.y+1; y < 10; y++){
                    if(!this.hasTank(this.state.tanks[tankNo].coord.x,y)){
                        tempLasers.push({"y" : true, "coord": {"x": this.state.tanks[tankNo].coord.x,"y": y}});
                    }
                    else{
                        //we could add something about getting hit here.
                        break;
                    }
                    this.setState({lasers: tempLasers});
                    setTimeout(function(){
                        this.setState({lasers: []})
                        }.bind(this),this.state.TURN_LENGTH-50);
                }
            break;
            case("W"):
                for(var x = this.state.tanks[tankNo].coord.x-1; x >= 0; x--){
                    if(!this.hasTank(x,this.state.tanks[tankNo].coord.y)){
                        tempLasers.push({"x" : true, "coord": {"x": x,"y": this.state.tanks[tankNo].coord.y}});
                    }
                    else{
                        //we could add something about getting hit here.
                        break;
                    }
                    this.setState({lasers: tempLasers});
                    setTimeout(function(){
                            this.setState({lasers: []})
                         }.bind(this),this.state.TURN_LENGTH-50);
                }
            break;
            case("N"):
                for(var y = this.state.tanks[tankNo].coord.y-1; y >= 0; y--){
                    if(!this.hasTank(this.state.tanks[tankNo].coord.x,y)){
                        tempLasers.push({"y" : true, "coord": {"x": this.state.tanks[tankNo].coord.x,"y": y}});
                    }
                    else{
                        //we could add something about getting hit here.

                        break;
                    }
                    this.setState({lasers: tempLasers});
                    setTimeout(function(){
                            this.setState({lasers: []})
                         }.bind(this),this.state.TURN_LENGTH-50);
                }
            break;
            case("E"):
                for(var x = this.state.tanks[tankNo].coord.x+1; x < 10; x++){
                    if(!this.hasTank(x,this.state.tanks[tankNo].coord.y)){
                        tempLasers.push({"x" : true, "coord": {"x": x,"y": this.state.tanks[tankNo].coord.y}});
                    }
                    else{
                        //we could add something about getting hit here.

                        break;
                    }
                }
                this.setState({lasers: tempLasers});
                setTimeout(function(){
                            this.setState({lasers: []})
                         }.bind(this),this.state.TURN_LENGTH-50);
            break;
        }
    },
    StartGame: function()
     {
            this.makeMove(0,0)
     },

     makeMove: function(index1, index2)
     {
            if(index1 >= this.state.game.moves.listOfMoves.length){
                return;}

                       switch(index2){
                            case(0):
                                switch(this.state.game.moves.listOfMoves[index1]['0']){
                                    case("SHOOT"):
                                      console.log("Shooting");
                                      this.fire(0)
                                    break;
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
                                    case("SHOOT"):
                                        console.log("Shooting");
                                          this.fire(1)
                                    break;
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
                                    case("SHOOT"):
                                        console.log("Shooting");
                                        this.fire(2)
                                    break;
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
                                    case("SHOOT"):
                                        console.log("Shooting");
                                        this.fire(3)
                                    break;
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
                console.log("Before" + this.state.tanksLeft);
                switch(index2)
                {

                    case(0):
                        if(this.state.game.moves.listOfMoves[index1]['0']){
                            exists = true;}
                        else{
                            console.log("Tank 0 died.");
                            if(this.state.tanks[0].visible == true){
                                this.state.tanksLeft--;
                            }
                            this.state.tanks[0].visible = false;
                            this.forceUpdate();
                            index2++;
                            }
                    break;
                    case(1):
                        if(this.state.game.moves.listOfMoves[index1]['1']){
                            exists = true;}
                        else{
                            console.log("Tank 1 died.");
                            if(this.state.tanks[1].visible == true){
                                this.state.tanksLeft--;
                            }
                             this.state.tanks[1].visible = false;
                            this.forceUpdate();
                            index2++;
                            }
                    break;
                    case(2):
                        if(this.state.game.moves.listOfMoves[index1]['2']){
                            exists = true;}
                        else{
                            console.log("Tank 2 died.");
                            if(this.state.tanks[2].visible == true){
                                this.state.tanksLeft--;
                            }
                            this.state.tanks[2].visible = false;
                            this.forceUpdate();
                            index2++;
                            }
                    break;
                    case(3):
                         if(this.state.game.moves.listOfMoves[index1]['3']){
                            exists = true;}
                        else{
                            console.log("Tank 3 died.");
                            if(this.state.tanks[3].visible == true){
                                this.state.tanksLeft--;
                            }
                            this.state.tanks[3].visible = false;
                            this.forceUpdate();
                            index2 =0;
                            index1++;

                            }
                    break;
                }
                if(this.state.tanksLeft <= 1)
                    exists = true;
                console.log("after");
            }
            console.log("out of game");
            console.log("Window: " + window.location.href);
            if(!this.isMounted())
                return;
           // if (!window.location.href.split("/")[6].split("?")[0] == "watch"){
            //    return;
            //}

            console.log(this.state.tanksLeft);
            
            if (this.state.tanksLeft <= 1 && !this.props.loginPage){
                this.DisplayWinner();
                return;
            }

            setTimeout(function(){
                this.makeMove(index1,index2);
            }.bind(this),this.state.TURN_LENGTH);
     },
     componentDidMount: function() {
        console.log(this.props.location.pathname);
       var pathname = this.props.location.pathname;
       var pieces = pathname.split("/");
       var gameID = pieces[2];
       console.log(gameID);

       $.get('/api/games/'+gameID, function (results) {
           for(var i =0 ; i < 4; i++)
           {
            this.state.tanks[i].name = results.users[i].tankName;
           }

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

        this.state.lasers.forEach(function(laser)
        {
           var image_url = "Blank.png";
           if(laser.y){
               image_url = "LaserUpDown.gif";
           } else if (laser.x){
               image_url = "LaserEastWest.gif";
           }
           image_url = '/images/'+image_url;
           board[laser.coord.y][laser.coord.x] = image_url
        });

        this.state.tanks.forEach(function(tank) {
            var image_url = "NorthS.png";
            if (tank.dir === "S") {
                image_url = "SouthS.png";
            } else if (tank.dir === "N") {
                image_url = "NorthS.png";
            } else if (tank.dir === "E") {
                image_url = "EastS.png";
            } else if (tank.dir === "W") {
                image_url = "WestS.png";
            }
            image_url = '/images/'+tank.index +'/' + image_url;
            if (tank.visible){
                board[tank.coord.y][tank.coord.x] = image_url;}
        });
        return (
            <div className = "wrapper">
                <div className ="container">
                    <center>
                    <table className="gameBoard Test"><tbody>
                            {board.map(function (row) {
                                return (
                                    <tr>
                                        {row.map(function (cell) {
                                            var image_url = "/images/Blank.png";
                                            if (cell) {
                                                image_url = cell;
                                            }
                                            return (<td><img height="65" width="65" src={image_url} /></td>);
                                        })}
                                    </tr>);
                            })}
                    </tbody></table>
                    <table className ="tankKey"><tbody>
                        <tr>
                        {this.state.tanks.map(function (tank){
                           var tankName = tank.name;
                           var image_url = '/images/' +tank.index +'/EastS.png';
                           return(<td className="Legend"><img height ="50" width="50" src={image_url} /><br/><center><b> {tankName} </b></center></td>);
                        })}
                       </tr>
                    </tbody></table>
                    </center>
                </div>
            </div>
    )}
});

module.exports = WatchGame;
