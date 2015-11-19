var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Register = require('./register.js');
var User = require('./user.js');
var Home = require('./home.js');
var ArenaHome = require('./arena_home.js');
var UploadTank = require('./upload_tank.js');

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
                        <li><Link to="register">Register</Link></li>
                        <li><Link to="arena_home">Arena Home</Link></li>
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

var routes = (
        <Router>
            <Route name="app" path="/" component={App}>
                <Route name="register" path="/register" component={Register} />
                <Route name="user" path="/user/:userId" component={User} />
                <Route name ="arena_home" path="/arena_home" component={ArenaHome} />
                <Route name ="upload_tank" path="/upload_tank" component={UploadTank} />
                <Route path="*" component={Home} />
            </Route>
        </Router>
        );

ReactDOM.render(routes, document.getElementById('appContainer'));

