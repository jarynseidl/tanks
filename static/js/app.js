// For ReactRouter 1.0.0
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

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
                        <li><Link to="page">Users</Link></li>
                      </ul>
                    </div>
                  </div>
                </nav>
        </div>
        <div className="detail">
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
                <Route name="page" path="/page" component={Page} />
                <Route path="*" component={Home} />
            </Route>
        </Router>
        );

ReactDOM.render(routes, document.body);

/*
var NavBar = React.createClass({
  render: function() {
    return <nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#"><img width="200" height="100" alt="Brand" src="/images/brand.png" /></a></div></div></nav>;
  }
});

ReactDOM.render(<NavBar />, document.body);
*/
