var Router = require('react-router').Router
var Route = require('react-router').Route
var DefaultRoute = require('react-router').DefaultRoute
var Link = require('react-router').Link
var Register = require('./register.js');
var User = require('./user.js');
var Home = require('./home.js');
var ArenaHome = require('./arena_home.js');
var UploadTank = require('./upload_tank.js');
var GetStarted = require('./get_started.js');
var YourGames = require('./your_games.js');
var Logout = require('./logout.js');
var OpenGames = require('./open_games.js');
var WatchGame = require('./watch_game.js');
var Auth = require('./authentication.js')
var TankList = require('./tanks.js');

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
                        {Auth.loggedIn() ? null : <li><Link to="home">Home</Link></li> }
                        {Auth.loggedIn() ? null : <li><Link to="register">Register</Link></li> }
                        {Auth.loggedIn() ? <li><Link to="upload_tank">Upload a Tank</Link></li> : null }
                        {Auth.loggedIn() ? <li><Link to="games">Join a Fight</Link></li> : null }
                        {Auth.loggedIn() ? <li><Link to="your_games">See Your Games</Link></li> : null }
                        {Auth.loggedIn() ? <li><Link to="user">Your Tanks</Link></li> : null }
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                        {Auth.loggedIn() ? <li><Logout history={this.props.history} /></li> : null }
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
                <Route name ="get_started" path="/get_started" component={GetStarted} />
                <Route name ="user" path="/user" component={User} />
                <Route name ="your_games" path="/your_games" component={YourGames} />
                <Route name ="open_games" path="/games" component={OpenGames} />
                <Route name ="watch_game" path="/games/:gameId/watch" component={WatchGame} />
                <Route path="*" component={Home} />
            </Route>
        </Router>
        );

ReactDOM.render(routes, document.getElementById('appContainer'));

