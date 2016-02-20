var Auth = require('./authentication.js');

var uploadTank =  function() {
    var self = this;
    if(self.tank_code == undefined){
        alert("Looks like there was a problem uploading your file. Try uploading it again.");
    }
    else{
        $.ajax({
            url: '/api/users/' + Auth.getUsername() + '/tanks/' + self.props.tank._id,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: self.props.tank.name,
                code: self.tank_code
            }),
            success: function(data) {
                self.props.history.pushState(null, '/user/' + Auth.getUsername());
            },
            error: function(xhr, status, err) {
            }
        });
    }
};

var Editor = React.createClass({
    componentDidMount: function() {
        var editor = ace.edit(this.refs.editor);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/java");
        editor.setValue(this.props.tank.code);

    },
    uploadText: function (e) {
        e.preventDefault();
        var editor = ace.edit(this.refs.editor);
        var self = this;
        self.tank_code = editor.getValue().trim();
        this.uploadTank();
    },
    uploadTank: uploadTank,
    render: function() {
        var self = this;
        var editorStyle =  {
            height: '500px',
            width: '600px',
            borderRadius: '5px'
        };

        return (
            <form onSubmit={this.uploadText}>
                <div className="input-group">
                    <span className="input-group-addon">Name:</span>
                    <input ref="tankName" type="text" className="form-control" defaultValue={self.props.tank.name}/>
                </div>

                <div className="input-group" ref="editor" style={editorStyle}></div>

                <div className="input-group blue">
                    <input type="submit" className="btn btn-primary" value="Add tank!" />
                </div>
            </form>
        );
    }
});

var DisplayTank = React.createClass({
    render: function() {
        console.log(this.props)
        var collapseId = "collapse_" + this.props.tank._id;
        return (
            <div className="accordion-group panel panel-info">
                <div className="accordion-heading panel-heading">
                  <a className="accordion-toggle" data-toggle="collapse" data-parent={"#" + this.props.accordionId} href={"#" + collapseId}>
                    {this.props.tank.name}
                  </a>
                </div>
                <div id={collapseId} className="accordion-body panel-body collapse">
                  <div className="accordion-inner">
                    <div className="input-group blue">
                        <input type="submit"
                        className="accordion-toggle btn btn-primary"
                        onClick={this.props.onDeleteTank.bind(null, this.props.tank._id)}
                        data-toggle="collapse" data-parent={"#" + this.props.accordionId}
                        href={"#" + collapseId} value="Delete Tank"
                        />
                    </div>
                  </div>
                </div>
            </div>
        )}
});

var TankCard = React.createClass({

    render: function() {
        var cardStyle = {
            border: '5px',
            backgroundColor: 'green',
            borderColor: 'blue',
            borderStyle: 'solid'
        }
        return (
            <div id={this.props.tank._id} style={cardStyle} onClick={this.props.onSelectTank.bind(null, this.props.tank)}>
                <div className="row">
                    <div className="col-md-3">
                        <div ref="tankName">{this.props.tank.name}</div>
                        <img src="/images/BlueSouth.gif"></img>
                    </div>
                    <div className="col-md-9">
                        <div ref="tankDesc">This tank brings death.</div>
                    </div>
                </div>
            </div>
        )

    }
});

var TankList = React.createClass({
    render: function() {
        var accordionId = Auth.getUsername() + "_tankList";
		var self = this;
        return (
            <div>
                <h3>Tanks: </h3>
                <div className="accordion" id={accordionId}>
                    {this.props.tanks.map(function(tank) {
                       return (
                           <div>
                               <TankCard tank={tank} key={tank._id} onSelectTank={self.props.onSelectTank}/>
                           </div>
                       )
                })}
                </div>
            </div>
            )}
});

module.exports = TankList;
