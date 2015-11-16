// For ReactRouter 1.0.0
//var Router = ReactRouter.Router;
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Navigation = require('react-router').Navigation

var User = React.createClass({
    getInitialState: function() {
        return {
            username: "",
            tankCount: 0
        }; 
    },
    componentDidMount: function() {
        $.get('/api/users/' + this.props.params.userId, function(result) {
            this.setState({
                username: result["username"],
                tankCount: result["tanks"].length
            });
        }.bind(this));
    },
    render: function() {
        return (
            <div className="displayUser">
                <h1>User</h1>
                <h4>Id: {this.state.username}</h4>
                <h4>Tanks: {this.state.tankCount}</h4>
            </div>
            )}
});


                          //dataType: 'json',
var Register = React.createClass({
    handleSubmit: function(e) {
                      e.preventDefault();
                      $.ajax({
                          url: '/api/users/',
                          contentType: 'application/json',
                          type: 'POST',
                          data: JSON.stringify({
                              'username': this.refs.username.value.trim(),
                              'password': this.refs.password.value.trim()
                          }),
                          processData: false,
                          success: function(data) {
                              this.props.history.pushState({}, '/user/' + data._id, {});
                          }.bind(this),
                          error: function(xhr, status, err) {
                              console.error('/api/users/', status, err.toString());
                          }.bind(this)
                      });
                      this.props.history.pushState({}, '/', {});
                      //Navigation.transitionTo('/crazylady');
                  },
    render: function() { 
                return (
                        <div className="registerUser">
                            <h1>Register User</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group">
                                    <span className="input-group-addon">Username:</span>
                                    <input ref="username" type="text" className="form-control" />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">Password:</span>
                                    <input ref="password" type="password" className="form-control" />
                                </div>
                                <div className="input-group">
                                    <input type="submit" className="btn btn-primary" value="Register" />
                                </div>
                            </form>
                        </div>
                       )
            }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <div className="master">
            <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="#">
                        <img alt="Brand" src="/images/brand.png" height="24" />
                      </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-navbar">
                      <ul className="nav navbar-nav">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="page">Page</Link></li>
                        <li><Link to="register">Register</Link></li>
                      </ul>
                    </div>
                  </div>
                </nav>
        </div>
        <div className="mainContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}) ;

var Page = React.createClass({
    render: function() {
        return (<h1>Page</h1>);
    }
});

var Home= React.createClass({
    render: function() {
        return (<h1>Home</h1>);
    }
});

var routes = (
        <Router>
            <Route name="app" path="/" component={App}>
                <Route name="register" path="/register" component={Register} />
                <Route name="page" path="/page" component={Page} />
                <Route name="user" path="/user/:userId" component={User} />
                <Route path="*" component={Home} />
            </Route>
        </Router>
        );

ReactDOM.render(routes, document.getElementById('appContainer'));

