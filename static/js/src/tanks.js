var Auth = require('./authentication.js');

var DisplayTank = React.createClass({
	deleteTank: function (tankId,e) {
		console.log("Delete tank with id: " + tankId);
    	$.ajax({
            url: '/api/users/' + Auth.getUsername() + '/tanks/'+ tankId,
            type: 'DELETE',
            contentType: 'application/json',
            success: function(data) {
                this.forceUpdate();
                //self.props.history.pushState(null, '/user/' + Auth.getUsername());
            }.bind(this),
            error: function(xhr, status, err) {
                   }.bind(self)
        });                  
    },
    render: function() {
        var collapseId = "collapse_" + this.props.tank._id;
        return (
            <div className="accordion-group panel panel-info">
                <div className="accordion-heading panel-heading">
                  <a className="accordion-toggle" data-toggle="collapse" data-parent={"#" + this.props.accordionId} href={"#" + collapseId}>
                    {this.props.tank.name}
                  </a>
                </div>
                <div id={collapseId} className="accordion-body panel-body collapse">
                  <div>
                  	<a className="accordion-toggle" onClick={this.deleteTank.bind(this, this.props.tank._id)} data-toggle="collapse" data-parent={"#" + this.props.accordionId} href={"#" + collapseId}>
                      Delete Tank
                  	</a>
                  </div>
                  <div className="accordion-inner">
                    {this.props.tank.code}
                  </div>
                </div>
            </div>
        )}
});

var TankList = React.createClass({
    render: function() {
        var accordionId = Auth.getUsername() + "_tankList";
        return (
            <div>
                <h3>Tanks: </h3>
                <div className="accordion" id={accordionId}>
                    {this.props.tanks.map(function(tank) {
                       return <DisplayTank tank={tank} key={tank._id} accordionId={accordionId} />;
                    })}
                </div>
            </div>
            )}
});

module.exports = TankList;
