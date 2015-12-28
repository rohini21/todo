var React         = require('react');
var Reflux        = require('reflux');
var Router        = require('react-router');
var Route         = Router.Route;
var Routes        = Router.Routes;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

module.exports =React.createClass({
	mixins : [Reflux.ListenerMixin,Router.Navigation],

	render: function(){
		return (
			<div className = "container">
			<h1 className="text-center">Error Page</h1>
			<p>Go to HomePage :<a href="#/todoapp">Home</a></p>
			</div>
		);
	}
});