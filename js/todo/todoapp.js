/** @jsx React.DOM */
/*
Todo Actions 
*/
var _               = require('lodash');
var React           = require('react');
var Reflux          = require('reflux');
var Router          = require('react-router');
var Link            = Router.Link;
var RouteHandler    = Router.RouteHandler;
var TodoTask        = require('./todotasks').View;
var TodoInput       = require('./todoinput');
var Users           = require('../users');
var SignUp          = require('../signup');
var SignIn          = require('../signin');
var adapter         = require('../adapters/rest');



/*
app View 
*/
var TodoApp = module.exports = React.createClass({
  render: function(){
    return (
      <div className = "container app-main">
        <TodoInput />
        <TodoTask />
      </div>
    );
  }
});
