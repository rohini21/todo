/** @jsx React.DOM */

var React     = require('react');
var Reflux    = require('reflux');
var Rest      = require('rest');
var Users     = require('./users');
var Router    			= require('react-router');
var Link            = Router.Link;
var RouteHandler    = Router.RouteHandler;

var SignUp = module.exports = React.createClass({
  register: function(e){
  	e.preventDefault();
    var email    = this.refs.email.getDOMNode().value;
    var username = this.refs.username.getDOMNode().value;
    var pswd     = this.refs.pswd.getDOMNode().value;
    var cpswd    = this.refs.cpswd.getDOMNode().value;
    if(email && username && pswd && cpswd){
	    if(pswd == cpswd){
	      Users.Actions.register(email,username,pswd,cpswd);  
	      console.log("user created");
	    } else{
	      alert("password not same");
	  	}
 		}
 		else{
 			alert("All fields are mandatory");
 		}
  },
	render:function(){
		return (
			<div className ="container">
				<h3 className="center grey-text text-darken-2">Todo App</h3>
				<div className ="sign-box">
					<h5>Sign Up!</h5>
					<div className = "cf sb">
						<form>
							<div className = "input-field">
								<i className="mdi-communication-email prefix"></i>
        				<input ref="email" type="email" className="validate" placeholder="Email Address" autoFocus></input>
							</div>
							<div className = "input-field">
								<i className="mdi-action-account-circle prefix"></i>
        				<input ref="username" type="text" className="validate" placeholder="Username"></input>
							</div>
							<div className = "input-field">
								<i className="mdi-action-lock prefix"></i>
        				<input ref="pswd" type="password" className="validate" placeholder="Password"></input>
							</div>
							<div className = "input-field">
								<i className="mdi-av-repeat prefix"></i>
        				<input ref="cpswd" type="password" className="validate" placeholder="Confirm Password"></input>
							</div>
							<div className ="sb-submit">
								<button className="btn waves-effect waves-light submit" type="submit" onClick={this.register}>Submit
	   							<i className="mdi-content-send right"></i>
	  						</button>
  						</div>  						
						</form>
						<div className="back">
								<i className="mdi-navigation-arrow-back"></i>
								<a href="#/signin">Back to Sign In</a>
							</div>
					</div>					
				</div> 
			</div>
		)
	}
});
