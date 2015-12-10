var Auth = require('./authentication.js');

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

var UploadTank = React.createClass({

	uploadText: function (e) {
                      e.preventDefault();
                      var self = this;
                      self.tank_code = this.refs.tankText.value.trim();
                      this.uploadTank();
                  },
  uploadFile: function (e) {
                    var self = this;
                    var reader = new FileReader();
                    self.file = e.target.files[0];

                    reader.onload = function(e) { 
                        var contents = e.target.result;             
                        self.tank_code = reader.result;
                        var words = code.split(' ');
                        self.fileLoaded = true;            
                    }
                    reader.readAsText(self.file);
                },
    uploadTank: function() {
        var self = this;
        self.tankName = this.refs.tankName.value.trim();
        if(self.tankName == "" || self.tankName == undefined){
            alert("Whoops. Looks like you forgot fill out everything.");
        } 
        else if(self.tank_code == undefined){
          alert("Looks like there was a problem uploading your file. Try uploading it again.");
        }
        else{          
            $.ajax({
                url: '/api/users/' + Auth.getUsername() + '/tanks',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: self.tankName,
                    code: self.tank_code
                }),
                success: function(data) {
                    self.props.history.pushState(null, '/user/' + Auth.getUsername());
                }.bind(this),
                error: function(xhr, status, err) {
                       }.bind(self)
            });
        }
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="registerUser">
                        <h1>Add tank</h1>
                        
                        <form onSubmit={this.uploadText}>
                            <div className="input-group">
                                <span className="input-group-addon">Name:</span>
                                <input ref="tankName" type="text" className="form-control" />
                            </div>
                            <textarea ref="tankText" cols="50" rows="10" defaultValue="Place your code here"></textarea>
                            <div className="input-group blue">
                                <input type="submit" className="btn btn-primary" value="Add tank!" />
                            </div>
                        </form>
                        <form onSubmit={this.uploadTank}>
                            <h3>Upload a java file (optional)</h3>
                            <input ref="tankFile" onChange={this.uploadFile} type="file" name="tank" accept="java/*" />
                            <div className="input-group blue">
                                <input type="submit" className="btn btn-primary" value="Add tank!" />
                            </div>
                        </form>

                    </div>
                </div>
                <div className="col-md-6">
                    <ExampleTanks></ExampleTanks>
                </div>
            </div>
                    );
    }
});

module.exports = UploadTank;
