var Auth = require('./authentication.js');
var TankCard = require('./tank_card.js');

var ExampleTanks = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Example Tanks</h1>
                <a href="/downloads/tanks/wait.java" download>Sitting Duck</a><br />
                <p>The basic tank template</p>
                <a href="/downloads/tanks/goNorth.java" download>Go North</a><br />
                <p>Turns until it faces north and then goes forward</p>
                <a href="/downloads/tanks/shootEast.java" download>Shoot East</a><br />
                <p>Turns until it faces east and then shoots</p>
            </div>
        );
    }
});

var UploadEditor = React.createClass({
    componentDidMount: function() {
        var editor = ace.edit(this.refs.editor);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/java");
        editor.setValue(
            "\nimport game.board.elements.Tank;" +
            "\nimport game.util.TANK_DIR;" +
            "\nimport game.util.TANK_MOVES;" +
            "\nimport org.bson.types.ObjectId;" +
            "\nimport org.mongodb.morphia.annotations.Embedded;" +
            "\nimport java.util.List;" +
            "\n\n@Embedded\npublic class YourTank extends Tank {\n\tpublic YourTank() {\n\t}\n\n\tpublic YourTank(ObjectId tankID, String tankName, int health) {\n\t\tsuper(tankID, tankName, health);" +
            "\n\t}\n\n\t@Override\n\tpublic TANK_MOVES calculateTurn(List<Tank> tanks, int size) {\n\t\tif (this.getDir() != TANK_DIR.E) {\n\t\t\treturn TANK_MOVES.TURN_RIGHT;" +
            "\n\t\t}\n\t\telse {\n\t\t\treturn TANK_MOVES.SHOOT;" +
            "\n\t\t}\n\t}\n}"
        );
    },
    getEditor: function(e) {
        var editor = ace.edit(this.refs.editor);
        return editor;
    },
    render: function() {
        var editorStyle =  {
            height: '500px',
            width: '600px',
            borderRadius: '5px'
        };

        return (
            <form>
                <div className="editorStyle" ref="editor"></div>
            </form>
        );
    }
});

var Armory = React.createClass({
    //the current tank in the editing area
    curr_tank: null,
    //boolean indicating whether or not the current code is for a new tank or an existing one
    is_new: true,
    //reset the editor to have default values on it
    resetEditor: function(){
        var editor = this.refs.upload_editor;
        var tankName = this.refs.tankName;
        editor.componentDidMount();
        tankName.value = "New Tank";
    },
    //uploads a java file from the client's computer and puts it in the text editor
    uploadFile: function (e) {
        var self = this;
        var reader = new FileReader();
        self.file = e.target.files[0];
        var editor = this.refs.upload_editor.getEditor();

        reader.onload = function(e) {
            var contents = e.target.result;
            self.tank_code = reader.result;
            editor.setValue(self.tank_code);
            self.fileLoaded = true; 
        }
        reader.readAsText(self.file);
    },
    //deletes a tank
    deleteTank: function () {
        //grab the current tank in the editing area
        var tank = this.curr_tank;
        var update = this.props.update;
        var resetEditor = this.resetEditor;
        //if there is no tank in the editing area, do nothing
        if(tank==null)
            return;
        //set the current tank variable to null because it will be deleted
        this.curr_tank = null;
        var self = this;
        var tankId = tank._id;
        this.is_new = true;
        $.ajax({
            url: '/api/users/' + Auth.getUsername() + '/tanks/'+ tankId,
            type: 'DELETE',
            contentType: 'application/json',
            success: function(data) {
                //callback to update the state component in user.js
                update();
                resetEditor();
            },
            error: function(xhr, status, err) {
            }
        });
    },
    //put the tank's code into editing area and update the curr_tank variable
    editTank: function(tank,e) {
        this.is_new = false;
        var editor = this.refs.upload_editor.getEditor();
        editor.setValue(tank.code);
        this.refs.tankName.value = tank.name;
        this.curr_tank = tank;
    },
    //set the current tank in the editing area
    setCurrTank: function(tank) {
        this.curr_tank = tank;
    },
    //save tank to the database
    saveTank:  function(e) {
        var update = this.props.update;
        var curr_tank = this.curr_tank;
        var tankName = this.refs.tankName.value.trim();
        var editor = this.refs.upload_editor.getEditor();
        var tank_code = editor.getValue().trim();
        var update = this.props.update;
        if(tankName == "" || tankName == undefined){
            alert("Whoops. Looks like you forgot fill out everything.");
        }
        else if(tank_code == undefined){
            alert("Looks like there was a problem uploading your file. Try uploading it again.");
        }
        else{
            var route;
            var reqType;
            var setCurrTank = this.setCurrTank;
            //set the route and type to this if the tank is brand new
            if(this.is_new){
                route = '/api/users/' + Auth.getUsername() + '/tanks';
                reqType = 'POST'; 
            }
            //set the route and type to this if the tank is being updated
            else {
                route = '/api/users/' + Auth.getUsername() + '/tanks/' + this.curr_tank._id;
                reqType = 'PUT';
            }
            this.is_new = false;
            $.ajax({
                url: route,
                type: reqType,
                contentType: 'application/json',
                data: JSON.stringify({
                    name: tankName,
                    code: tank_code
                }),
                success: function(data) {
                    setCurrTank(data);
                    update();
                },
                error: function(xhr, status, err) {
                }
            });
        }
    },
    //prepares a new tank to be saved and puts it in the editing area
    newTank: function(){
        this.is_new = true;
        this.resetEditor();

    },
    render: function() {
        var user_tanks = this.props.tanks;
        var editTank = this.editTank;
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 armory-top flex">
                        <button type="submit" className="btn btn-primary button" onClick={this.newTank}>Create New Tank</button>
                        <div className="tankPanel dark-background ">
                            {user_tanks.map(function(tank,i) {
                                   return <TankCard tank={tank} key={i} inArmory={true} editTank={editTank}/>;
                            })}
                        </div>
                    </div>
                    <div className="col-md-9 armory-top flex">
                        <div className="input-group">
                            <span className="input-group-addon">Name: </span>
                            <input ref="tankName" type="text" className="form-control"/>
                        </div>
                        <div className="horizontal">
                            <button type="submit" className="btn btn-primary button" onClick={this.saveTank}>Save</button>
                            <button type="submit" className="btn btn-primary button" onClick={this.props.update}>Run</button>
                            <input className="inputfile" ref="tankFile" onChange={this.uploadFile} type="file" name="tankFile" id="tankFile" accept="java/*" />
                            <label className="btn btn-primary button" htmlFor="tankFile">Upload</label>
                            <button type="submit" className="btn btn-primary button">Download</button>
                            <button type="submit" className="btn btn-primary button" onClick={this.deleteTank}>Delete</button>
                        </div>
                        <div>
                            <UploadEditor ref="upload_editor" history={this.props.history}/>
                        </div>
                    </div>
                </div>
                <div className="compiler-output dark-background white">
                    Compiler Output
                </div>
            </div>
        );
    }
});

module.exports = Armory;
