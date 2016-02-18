var Editor = React.createClass({
    componentDidMount: function() {
        var editor = ace.edit(this.refs.editor);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/java");
        if (this.props.init) {
            editor.setValue(this.props.init);
        }
    },
    render: function() {
        var editorStyle =  {
            height: '500px',
            width: '100%',
            margin: '10px 0',
            borderRadius: '5px'
        };

        return (
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <div className="input-group">
                            <span className="input-group-addon">Name</span>
                            <input ref="tankName" type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group blue btn-block">
                            <input type="submit" className="btn btn-primary btn-block" value="Add tank" />
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
