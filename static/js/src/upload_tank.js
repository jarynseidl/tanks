var Auth = require('./authentication.js');

var UploadTank = React.createClass({

	uploadText: function (e) {
                      e.preventDefault();
                      var self = this;
                      self.tankName = this.refs.tankName1.value.trim();
                      self.tank_code = this.refs.tankText.value.trim();
                      /*$.ajax({
                          url: '/api/users/' + Auth.getUsername() + '/tanks',
                          type: 'POST',
                          contentType: 'application/json',
                          data: JSON.stringify({
                              name: tankName,
                              code: code
                          }),
                          success: function(data) {
                              this.props.history.pushState(null, '/user/' + Auth.getUsername());
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });*/
                      this.uploadTank();
                  },
    uploadFile: function (e) {
                      var self = this;
                      var reader = new FileReader();
                      self.file = e.target.files[0];
                      self.tankName = this.refs.tankName2.value.trim();
                      reader.onload = function(e) { 
                          var contents = e.target.result;             
                          self.tank_code = reader.result;
                          var words = code.split(' ');            
                         /* $.ajax({
                              url: '/api/users/' + Auth.getUsername() + '/tanks',
                              type: 'POST',
                              contentType: 'application/json',
                              data: JSON.stringify({
                                  name: tankName,
                                  code: code
                              }),
                              success: function(data) {
                                  self.props.history.pushState(null, '/user/' + Auth.getUsername());
                              }.bind(this),
                              error: function(xhr, status, err) {
                                     }.bind(self)
                          });*/
                      }

                      reader.readAsText(self.file);

                      //TODO: Add code to send the textarea's input to the server. Then display a success or failure.

                  },
    uploadTank: function() {
        var self = this;
        //var reader = new FileReader();
        //var tankName = this.refs.tankName.value.trim();
        //reader.onload = function(e) { 
            //var contents = e.target.result;             
            //var code = reader.result;
            //var words = code.split(' ');            
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
        //}

        //reader.readAsText(self.file);

    },
    render: function() {
        return (
            <div className="registerUser">
                <h1>Add tank</h1>
                
                <form onSubmit={this.uploadText}>
                    <div className="input-group">
                        <span className="input-group-addon">Name:</span>
                        <input ref="tankName1" type="text" className="form-control" />
                    </div>
                    <textarea ref="tankText" cols="50" rows="10" defaultValue="Place your code here"></textarea>
                    <div className="input-group blue">
                        <input type="submit" className="btn btn-primary" value="Add tank!" />
                    </div>
                </form>
                <form onSubmit={this.uploadTank}>
                    <h3>Upload a java file (optional)</h3>
                    <div className="input-group">
                        <span className="input-group-addon">Name:</span>
                        <input ref="tankName2" type="text" className="form-control" />
                    </div>
                    <input ref="tankFile" onChange={this.uploadFile} type="file" name="tank" accept="java/*" />
                    <div className="input-group blue">
                        <input type="submit" className="btn btn-primary" value="Add tank!" />
                    </div>
                </form>

            </div>
                    );
    }
});

module.exports = UploadTank;
