var Auth = require('./authentication.js');

var Editor = React.createClass({
    getInitialState: function() {
        return {
            value : this.props.selectedTank.name
        }
    },
    handleChange: function(e) {
        this.setState({
            value: e.target.value
        })
    },
    componentDidMount: function() {
        var editor = ace.edit(this.refs.editor);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/java");
        editor.setValue(this.props.selectedTank.code);
        this.setState({
            value: this.props.selectedTank.name
        })
        // TODO: Fix tank name problem
    },
    componentWillReceiveProps: function(nextProps) {
        ace.edit(this.refs.editor).setValue(nextProps.selectedTank.code);
        this.setState({
            value: this.props.selectedTank.name
        })

    },
    editTank: function() {
        var self = this;
        self.tankName = this.refs.tankName.value.trim();
        self.tankCode = ace.edit(this.refs.editor).getValue();
        if(self.tankName == "" || self.tankName == undefined){
            alert("Whoops. Looks like you forgot fill out everything.");
        }
        else if(self.tankCode == undefined){
            alert("Looks like there was a problem uploading your file. Try uploading it again.");
        }
        else{
            $.ajax({
                url: '/api/users/' + Auth.getUsername() + '/tanks/' + self.props.selectedTank._id,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: self.tankName,
                    code: self.tankCode
                }),
                success: function(data) {
                    console.log(data)
                    // self.props.history.pushState(null, '/user/' + Auth.getUsername());
                },
                error: function(xhr, status, err) {
                    console.log(err);
                }
            });
        }
    },
    render: function() {
        var editorStyle =  {
            height: '50em',
            width: '100%',
            margin: '10px 0',
            borderRadius: '5px'
        };
        return (
            <form onSubmit={this.editTank}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="input-group">
                            <span className="input-group-addon">Name</span>
                            <input ref="tankName" type="text" className="form-control" onChange={this.handleChange} value={this.state.value}/>

                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group blue btn-block">
                            <input type="submit" className="btn btn-primary btn-block" value="Save tank" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group" ref="editor" style={editorStyle}></div>
                    </div>
                </div>
            </form>
        )
    }
});

module.exports = Editor;
