var Built  = require('built.io-browserify');
var app    = Built.App('blt9601aa13c191c1a4')
							.setAdaptor(Built.Adaptor.HTTP)
							.persistSessionWith(Built.Session.LOCAL_STORAGE);

var user  = app.User();
var User  = app.User;
var Obj   = app.Class('tododata');
//var Query = app.Class('tododata').Query();	

module.exports.register = function(data){
	return user.register(data.email,data.pswd,data.cpswd);
}
  
module.exports.login = function(data){
	return user.login(data.email,data.pswd);
}

module.exports.logout = function(){
	return user.logout();
}

module.exports.getSession = function(){
	return User.getSession();
}

module.exports.addItem = function(data){
 	var item = Obj.Object(data);
  return item.save()
  .then(function(data){
		return data.data;
  })
}

module.exports.getItems = function(){
	return Obj.Query().exec()
 	.then(function(data){
		var obj = data.map(function(item){
		 	return item.data;
		});
	return (obj);
	});
}

module.exports.removeItem = function(data){
	var item = Obj.Object(data);
	return item.delete();
}

module.exports.toggleItem = function(data){
	var item = Obj.Object(data);
	return item.save();
}

module.exports.deleteAll = function(){
	var Query = Obj.Query;
	var query = Query();
  query     = query.where('iscomplete',true);
  return query.delete();
}