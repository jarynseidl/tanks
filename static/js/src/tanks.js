var Auth = require('./authentication.js');
var classNames = require('classnames');

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

// var TankCard = React.createClass({
//
//     render: function() {
//         var cardStyle = {
//             backgroundColor: 'white',
//             borderRadius: '3px',
//             margin: '10px 0',
//         }
//         return (
//             <div id={this.props.tank._id} style={cardStyle} onClick={this.props.onSelectTank.bind(null, this.props.tank)}>
//                 <div className="row">
//                     <div className="col-md-3">
//                         <div ref="tankName">{this.props.tank.name}</div>
//                         <img src="/images/BlueSouth.gif"></img>
//                     </div>
//                     <div className="col-md-9">
//                         <div ref="tankDesc">This tank brings death.</div>
//                     </div>
//                 </div>
//             </div>
//         )
//
//     }
// });

var TankCard = React.createClass({

    getInitialState: function() {
        return {
            isSelected: false
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            isSelected: nextProps.selected
        });
    },
    handleSelect: function() {
        this.props.onSelectTank(this.props.tank);
        this.setState({
            isSelected: true
        });

    },
    render: function() {

        var cardStyle = {
            backgroundColor: 'white',
            borderRadius: '3px',
            margin: '10px 0',
            padding: '0 10px'
        }
        var statsStyle = {
            verticalAlign: 'bottom'
        }

        var cardClass = classNames({
            'tankCard': true,
            'card-selected': this.state.isSelected
        });
        return (
            <div className={cardClass} id={this.props.tank._id} onClick={this.handleSelect}>
                <div className="row">
                    <div className="col-md-3">
                        <div ref="tankName">{this.props.tank.name}</div>
                        <img className="tank-image" src="/images/BlueEast.gif"></img>
                    </div>
                    <div className="col-md-6">
                        <div ref="tankDesc">This tank brings death.</div>
                        <div ref="tankStats" style={statsStyle}>
                            <span>Won:</span>
                            <span>Lost:</span>
                            <span>Kills:</span>
                        </div>
                    </div>
                    <div className="col-md-3 delete-btn">
                        <button type="button" className="btn btn-danger" onClick={this.props.deleteTank}>Delete</button>
                    </div>
                </div>
            </div>
        )

    }
});

var TankList = React.createClass({
    getInitialState: function() {
        return {
            selectedTank: null
        }
    },
    handleSelectTank: function(tank) {
        this.props.onSelectTank(tank);
        this.setState({
            selectedTank: tank
        });
    },
    render: function() {
        var accordionId = Auth.getUsername() + "_tankList";
		var self = this;
        var listStyle = {
            height: '500px',
            overflowY: 'auto',
            overflowX: 'hidden'
        };
        return (
            <div ref="tankList">
                {this.props.tanks.map(function(tank) {
                   return <TankCard
                            tank={tank}
                            key={tank._id}
                            selected={self.props.selectedTank ? self.props.selectedTank._id === tank._id : false}
                            onSelectTank={self.handleSelectTank}
                            deleteTank={self.props.deleteTank}
                          />
                })}
            </div>
            )}
});

module.exports = TankList;
