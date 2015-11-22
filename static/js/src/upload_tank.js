var UploadTank = React.createClass({

	uploadText: function (e) {
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
    uploadText: function (e) {
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
                <textarea name="paragraph_text" cols="50" rows="10">Place your code here</textarea>
                <form onClick={this.uploadText}>
                     <div className="input-group blue">
                        <input type="submit" className="btn btn-primary" value="Add tank!" />
                    </div>
                </form>
                <h3>or upload your java file here</h3>
                <form onClick={this.uploadFile}>
                    <input type="file" name="tank" accept="java/*" />
                    <input type="submit" />
                </form>
            </div>
                    );
    }
});

module.exports = UploadTank;
