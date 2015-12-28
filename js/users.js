/** @jsx React.DOM */
var react   = require('react');
var Reflux  = require('reflux');
var rest    = require('rest');
var adapter = require('./adapters/sdk');

var Actions = module.exports.Actions= Reflux.createActions([      
  "register",
  "login",
  "logout"
]);

var Store = module.exports.Store= Reflux.createStore({ 
  init: function() {
    var self = this;
	  this.listenToMany(Actions);
    this.user = undefined;
    adapter.getSession()
      .then(function (data){
        self.change(data);
      },
      function(error){
        self.change(null);
      });
  },
  getInitialState: function() {
    return this.user;
  },
  change: function(user){
    this.user = user;
    this.trigger(user);
  },
  onRegister: function(email,username,pswd,cpswd){    	 
		var user = ({
      email                 : email,
	    username              : username, 
	    password              : pswd,
      password_confirmation : cpswd
		});
		adapter.register(user)
    .then(function (data){ 
      alert("user created"); 
  	},function (error){
        if(error.entity.error_code){
          alert("Email: "+error.entity.errors.email)
        }
      }
    ); 
  },
  onLogin: function(email,pswd){
    var self=this;
    if(self.user) // User is already logged in.
      return console.log('already logged in');    
    self.user =({
      email : email,
      pswd  : pswd
    });
    adapter.login(self.user)
    .then(function (data){
      localStorage.setItem("user",JSON.stringify(data));         
      alert("Successfully logged in");
      self.change(data);
    },function (error){
        if(error.entity.error_code){
          alert(error.entity.errors)
        }
      }
    );
  },
  onLogout: function(){
    var self=this;
    adapter.logout(self.user)
    .then(function (data){
      localStorage.removeItem("user");
      self.change(null);
      alert("successfully logged out");
    },function (error){
        if(error.entity.error_code){
          alert(error.entity.errors)
        }
      }
    );
  } 
});
