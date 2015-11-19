var UploadTank = React.createClass({
	handleClick: function (e) {
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
                        <form onClick={this.handleClick}>
                             <div className="input-group">
                                <input type="submit" className="btn btn-primary" value="Add tank!" />
                            </div>
                        </form>
                    </div>
                    );
    }
});

module.exports = UploadTank;