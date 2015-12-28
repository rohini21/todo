/* @jsx React.DOM */

//loading jquery
$ = jQuery = require('jquery');

//loading jquery-ui
require('jquery-ui');

//loading lodash
var _=require('lodash');

//loading materialize
require('../css/materialize.css');
require('../js/libs/materialize.js');

//loading our own css
require('../css/theme.css');

var React         = require('react');
var Reflux        = require('reflux');
var Built         = require('built.io-browserify');
var Router        = require('react-router');
var Route         = Router.Route;
var Routes        = Router.Routes;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App           = require('./app');
var Rest          = require('../js/adapters/rest');
var Users 				= require('../js/users');
var Container     = require('../js/todo/container');
var TodoApp       = require('../js/todo/todoapp');
var SignUp        = require('../js/signup');
var SignIn        = require('../js/signin');
var NotFound      = require('./notfound');

var routes = 
  (
  	<Route name="app" path="/" handler={App}>
    	<Route name="container" path="container" handler={Container}>
    		<Route name="todoapp" path="/todoapp" handler={TodoApp} />
    	</Route>
      <Route name="signin" path="/signin" handler={SignIn} />
      <Route name="signup" path="/signup" handler={SignUp} /> 
      <DefaultRoute handler={Container} />
      <NotFoundRoute handler ={NotFound}/>
    </Route>
  );

Router.run(routes, function (Handler, state) {
  React.render(<Handler params={state.params}/>, document.body);
});





