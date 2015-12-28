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
var TodoList        = require('./todolist');
var Users           = require('../users');
var SignUp          = require('../signup');
var SignIn          = require('../signin');
var adapter         = require('../adapters/rest');

var TodoActions = module.exports.TodoActions = Reflux.createActions([
  "addItem",
  "removeItem",
  "toggleItem",
  "sortList",
  "getItems",
  "clearCompleted"
]);

var total, done, remaining;

/*
Todo Store 
*/

var todoStore = module.exports.todoStore = Reflux.createStore({
  init: function(){
    var self = this;
    self.listenToMany(TodoActions);
    self.list =[];
  },

  onAddItem: function(content){
    var self = this;
    adapter.addItem(content)
      .then(function (data){
        self.change([data].concat(self.list));
      },function (error) {
          console.log(error);
        }
      );
  },

  onRemoveItem: function(data){
    var self = this;
    var updated_list = _.filter(self.list, function(item){
      return item.uid !== data.uid
    });
    adapter.removeItem(data)
    .then(function (data){
        console.log("item removed");
        self.change(updated_list);
    },function (error){
        console.log(error);
      }
    ); 
  },

  onToggleItem: function(data){
    var self = this;
    data.iscomplete = !(data.iscomplete);
    self.list.forEach(function(item){
      if(item.uid == data.uid){
        item.iscomplete = data.iscomplete;
      }
    });
    adapter.toggleItem(data)
    .then(function (data){
       self.change(self.list);
    },function (error) {
      }
    ); 
  }, 

  change: function(list){
    this.list = list;
    this.trigger(list);
  },

  onSortList: function(start, stop) {
    var data = this.list;
    data.splice(stop, 0, data.splice(start,1)[0]);
    this.change(data);
  },

  onGetItems: function(){
    var self = this;
    adapter.getItems()
    .then(function (data){
      self.change(data);
    },function (error){
        console.log(error);
      }
    );
  },

  onClearCompleted: function(){
    console.log("clearr");
    var self = this;
    var updated_list = _.filter(self.list, function(item){
      return !item.iscomplete;
    });
    console.log(updated_list);
    adapter.deleteAll()
    .then(function (){
      self.change(updated_list);
    });
  }
});

 module.exports.View = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function() {
    this.listenTo(todoStore, this.callBack, this.callBack);
  },
  callBack: function(data){
    total     = data.length;
    done      = parseInt(0);
    remaining = parseInt(0); 
    data.forEach(function(data){
      if(data.iscomplete == true)
        done = done + 1;
    }); 
    remaining = total - done;
    this.setState(data);
  },
  render: function(){
    return (
      <div className = "container">
        <TodoList  />
        <div className="item-count">
          <table>
            <thead>
              <tr>
                <th>All: {total}</th>
                <th>Completed: {done}</th>
                <th>Active: {remaining}</th>
                <th><a className="waves-effect waves-light cyan lighten-1 btn" onClick={TodoActions.clearCompleted}>Clear Completed</a></th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
});
