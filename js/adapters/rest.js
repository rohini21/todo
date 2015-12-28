var rest 		  = require('rest');
var mime 			= require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var config 		= require('./config');
var when      = require('when');
var client 		= rest.wrap(mime, {
	mime: 'application/json'
})
.wrap(errorCode, {
	code: 400
});

//To Register
module.exports.register = function(data){
	var path   = config.path.path;
	var method = 'POST';
	var headers= config.headers;
	var entity ={
		"application_user":{
		  "email"     					 : data.email,
		  "username"					   : data.username,
	    "password"             : data.password,
	    "password_confirmation": data.password_confirmation
		} 		
  };
	return client(getAdapterObject(path,method,headers,entity));
}

//To Login
module.exports.login = function(data){
	var path   = config.path.path + '/login';
	var method = 'POST';
	var headers= config.headers;
	var entity ={
		"application_user":{
		  "email"   : data.email,
      "password": data.pswd
		} 		
	};
	return client(getAdapterObject(path,method,headers,entity))
	.then(function(data){
  	return data.entity.application_user;
  });
}

//To Logout
module.exports.logout = function(){
	var path             = config.path.path +'/logout';
	var method           = 'DELETE';
	var headers          = config.headers;
	var obj              = JSON.parse(localStorage.getItem("user"));
	var authtoken				 = obj.authtoken;
	headers["authtoken"] = authtoken;
	var entity           = null;
	return client(getAdapterObject(path,method,headers,entity));
}

//To get session
module.exports.getSession = function(){
	var user = localStorage.getItem("user");
	if(user)
		return when.resolve(user);
	else
		return when.reject(user);
}

//To add item
module.exports.addItem = function(data){
	var path             = config.path.classUid;
	var method           ='POST';
	var headers          = config.headers;
	var obj              = JSON.parse(localStorage.getItem("user"));
	var authtoken				 = obj.authtoken;
	headers["authtoken"] = authtoken;
	var entity 				   = {
    "object": {
      "iscomplete": data.iscomplete,
      "label"     : data.label
    }
  };
  return client(getAdapterObject(path,method,headers,entity))
  .then(function(data){
  	return data.entity.object;
  });
}

//To get all items
module.exports.getItems = function(){
  var path             = config.path.classUid; 
  var method           = 'GET'; 
  var headers          = config.headers;
  var obj              = JSON.parse(localStorage.getItem("user"));
	var authtoken				 = obj.authtoken;
	headers["authtoken"] = authtoken;
  var entity           = null;
  return client(getAdapterObject(path,method,headers,entity))
  .then(function(data){
  	return data.entity.objects;
  });
}

//To delete an item
module.exports.removeItem = function(data){  
  var obj_uid          = data.uid;
  var path             = config.path.classUid + '/'+ obj_uid;  
  var method           = 'DELETE';
  var headers          = config.headers;
  var obj              = JSON.parse(localStorage.getItem("user")); 
  var authtoken        = obj.authtoken;  
  headers["authtoken"] = authtoken;
  var entity           = null;
  return client(getAdapterObject(path,method,headers,entity));
}

//To toggle an item
module.exports.toggleItem = function(data){
	var obj_uid					 = data.uid;
	var path 						 = config.path.classUid + '/' +obj_uid;
	var method           = 'PUT';
	var headers          = config.headers;
  var obj              = JSON.parse(localStorage.getItem("user")); 
  var authtoken        = obj.authtoken;  
  headers["authtoken"] = authtoken;
  var entity 				   = {
    "object": {
      "iscomplete": data.iscomplete,
    }
  };
  return client(getAdapterObject(path,method,headers,entity));
}

//To ClearCompleted items
module.exports.deleteAll = function(){
  var path             = config.path.classUid;            
  var method           = 'POST';
  var headers          = config.headers;
  var obj              = JSON.parse(localStorage.getItem("user")); 
  var authtoken        = obj.authtoken;  
  headers["authtoken"] = authtoken;
  var entity           ={
  	"_method": "DELETE",
		"query": {
			"iscomplete": true
		}
  }  
  	console.log(method);
  return client(getAdapterObject(path,method,headers,entity))
  
}

function getAdapterObject(path,method,headers,entity){
	return {
		path   : config.path.URLPREFIX + path,
		method : method,
		headers: headers,
		entity : entity
	}
}


