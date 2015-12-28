/** @jsx React.DOM */

var React     = require('react');
var Reflux    = require('reflux');
var Rest      = require('rest');
var Users     = require('./users');
var Router    = require('react-router');

var SignIn = module.exports = React.createClass({
	mixins : [Reflux.ListenerMixin,Router.Navigation],
	login:function(e){
		e.preventDefault();
		console.log("entered");
		var email  = this.refs.email.getDOMNode().value;
		var pswd   = this.refs.password.getDOMNode().value;
		 if(email && pswd){
	      Users.Actions.login(email,pswd);  
	    } else{
 			alert("All fields are mandatory");
 		}
	},		
  getInitialState: function(){
    return { user:undefined };    
  },
  componentDidMount: function() {
    this.listenTo(Users.Store, this.callBack, this.callBack);
  },
  callBack :function(user){
    if(user){
      this.transitionTo('todoapp');
    } else{   	
      this.transitionTo('signin');
    }    
  },
	render:function(){
		return (
			<div className ="container text">
			<h3 className="center grey-text text-darken-2">Todo App</h3>
				<div className ="sign-box">
					<div className = "sb">
						<form>
							<div className = "input-field">
								<i className="mdi-communication-email prefix"></i>
        				<input id="icon_prefix" ref="email" type="email" autoFocus className="validate" placeholder="Email Address"></input>
							</div>
							<div className = "input-field">
								<i className="mdi-action-lock prefix"></i>
        				<input id="icon_prefix" ref="password" type="password" className="validate" placeholder="Password"></input>
							</div>
							<div className ="">
								<button className="btn waves-effect waves-light" type="submit" onClick={this.login}>Sign In
	   							 <i className="mdi-content-send right"></i>
	  						</button>
  						</div>
						</form>
					</div>
					<div className="back">
						<i className="mdi-navigation-arrow-forward"></i>
						<a href="#/signup">Register</a>
					</div>
				</div> 
			</div>
		)
	}
});
