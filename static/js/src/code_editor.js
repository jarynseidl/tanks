var Auth = require('./authentication.js');

var Placeholder = React.createClass({
    render: function() {
        var style = {
            backgroundColor: '#D4D2D2',
            color: '#F0EFEF',
            fontSize: '5em',
            textAlign: 'center',
            verticalAlign: 'middle',
            textShadow: '1px 4px 6px #BDBCBC, 0 0 0 #000, 1px 4px 6px #BDBCBC',
            borderRadius: '5px',
            height: '8em',
            lineHeight: '8em'
        }
        return (
            <div style={style}>
                Choose a tank
            </div>
        )
    }
});

var Editor = React.createClass({
    getInitialState: function() {
        return {
            name: this.props.selectedTank.name,
            code: this.props.selectedTank.code
        }
    },
    handleChange: function(e) {
        this.setState({
            name: e.target.value
        })
    },
    componentDidMount: function() {
        var editor = ace.edit(this.refs.editor);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/java");
        editor.setValue(this.props.selectedTank.code);
    },
    componentWillReceiveProps: function(nextProps) {
        ace.edit(this.refs.editor).setValue(nextProps.selectedTank.code);
        this.setState({
            name: nextProps.selectedTank.name,
            code: nextProps.selectedTank.code
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
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: self.tankName,
                    code: self.tankCode
                }),
                success: function(data) {
                    console.log(data);
                    self.setState({
                        name: self.tankName,
                        code: self.tankCode
                    });
                    self.props.update(data);
                    // ace.edit(this.refs.editor).setValue(nextProps.selectedTank.code);

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
            height: '43em',
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
                            <input ref="tankName" type="text" className="form-control" onChange={this.handleChange} value={this.state.name}/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group blue btn-block">
                            <input type="button" className="btn btn-primary btn-block" onClick={this.editTank} value="Save tank" />
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

module.exports = {
    View: Editor,
    Placeholder: Placeholder
};
