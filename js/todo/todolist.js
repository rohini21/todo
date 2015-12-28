/** @jsx React.DOM */

var React        = require('react');
var Reflux       = require('reflux');
var TodoListItem = require('./todolistitem');
var TodoTask     = require('./todotasks');
var adapter      = require('../adapters/rest');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	getInitialState: function(){
		return {
			list: [] 
		}
	}, 
	componentDidMount: function(){
		var start,stop;
  	this.listenTo(TodoTask.todoStore, this.change,this.change);
  	TodoTask.TodoActions.getItems();
  	var sort = $(this.refs.sortable.getDOMNode());
  	sort.sortable({
  		containment         : "parent",
  		axis                : "y",
  		placeholder         : "sortable-placeholder",
  		forcePlaceholderSize: true,
  		handle              : ".drag",
  		start: function( event, ui ) {
  			start = ui.item.index();
  			return start;
  		},
  		stop: function( event, ui ){
  			stop = ui.item.index();
  			TodoTask.TodoActions.sortList(start,stop);
  		},
  	});
  },
  change: function(list){
    this.setState({
    	list: list
    }) 
  },
	componentWillMount: function(){
		this.setState({list: this.state.list});
	},
	render: function(){
		return (
			<div className="list-wrapper">
				<ul className="list" ref="sortable">
				{ 
					this.state.list.map(function(item){ 
						return <TodoListItem item={item} key={Math.random()}></TodoListItem>  //issue 
					})
				}
				</ul>
			</div>
		);
	}
});
