/** @jsx React.DOM  */
var _               = require('lodash');
var React           = require('react');
var Reflux          = require('reflux');
var Router          = require('react-router');
var Link            = Router.Link;
var RouteHandler    = Router.RouteHandler;
var TodoApp         = require('./todoapp');
var TodoList        = require('./todolist');
var TodoInput       = require('./todoinput');
var Users           = require('../users');
var SignUp          = require('../signup');
var SignIn          = require('../signin');

var UserMenu = React.createClass({
  componentDidMount: function(){
    var dropdown =  $(this.refs.dropdown.getDOMNode());
    dropdown.dropdown({
      hover:false
    }); 
  },
  onLogout: function(e) {
    e.preventDefault();
    Users.Actions.logout();
  },
  render: function() {
    var obj   = JSON.parse(localStorage.getItem("user"));
    var email = obj.email; 
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a  onClick={this.onLogout} href="#!">Logout</a></li>
        </ul>
        <div className ="navbar-fixed">
          <nav className="grey darken-3">
            <div className="nav-wrapper">
              <p className="brand-logo">Todos<i className="mdi-action-list left"></i></p>
              <ul className="right">
                <li>
                  <a className="dropdown-button" href="#" ref="dropdown" data-beloworigin="true" data-activates="dropdown1">{email}<i className="mdi-navigation-arrow-drop-down right"></i></a> 
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
});

var Container = module.exports = React.createClass({
	mixins : [Reflux.ListenerMixin,Router.Navigation],
  getInitialState: function(){
    return { user:undefined };    
  },
  componentDidMount: function() {       
    this.listenTo(Users.Store, this.callBack, this.callBack); 
  },
  callBack :function(user){
    if(user===null){
      this.transitionTo('signin');
    } else if(user===undefined){
    	this.setState({
        user: user
      });      
    } else{
      this.setState({
        user:user
      });
    }    
  },
  render: function(){
  	var user        = this.state.user;
    var obj         = JSON.parse(localStorage.getItem("user")); 
    var emailId     = obj.email;
  	var content     = '';
  	var loadingPage = (<div>Please wait...</div>);
  	var wrapper     = (
    <div>
      <UserMenu />
      <RouteHandler params={this.props.params} user={user}/>
      <footer className="page-footer abc grey darken-3">
          @ raweng 2015 
      </footer>
    </div>

    )
    if(user === undefined){
    	content = loadingPage;
    }
    else if(user){
    	content = wrapper;
    }
    return (
    	content
    )	
  },
});