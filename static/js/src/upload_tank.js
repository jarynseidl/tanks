var Auth = require('./authentication.js');

var UploadTank = React.createClass({

	uploadText: function (e) {
                      e.preventDefault();
                      var tankName = this.refs.tankName.value.trim();
                      var code = this.refs.tankText.value.trim();
                      $.ajax({
                          url: '/api/users/' + Auth.getUsername() + '/tanks',
                          type: 'POST',
                          contentType: 'application/json',
                          data: JSON.stringify({
                              name: tankName,
                              code: code
                          }),
                          success: function(data) {
                              this.props.history.pushState(null, '/arena_home');
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });
                  },
    uploadFile: function (e) {
                      e.preventDefault();
                      $.ajax({
                          success: function(data) {
                              this.props.history.pushState(null, '/arena_home');
                          }.bind(this),
                          error: function(xhr, status, err) {
                                 }.bind(this)
                      });
                      //TODO: Add code to send the textarea's input to the server. Then display a success or failure.

                  },
    render: function() {
        return (
            <div className="registerUser">
                <h1>Add tank</h1>
                
                <form onSubmit={this.uploadText}>
                    <div className="input-group">
                        <span className="input-group-addon">Name:</span>
                        <input ref="tankName" type="text" className="form-control" />
                    </div>
                    <textarea ref="tankText" cols="50" rows="10" defaultValue="Place your code here"></textarea>
                    <h3>Upload a java file (optional)</h3>
                    <input ref="tankFile" type="file" name="tank" accept="java/*" />
                    <div className="input-group blue">
                        <input type="submit" className="btn btn-primary" value="Add tank!" />
                    </div>
                </form>

            </div>
                    );
    }
});

module.exports = UploadTank;
