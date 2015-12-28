/** @jsx React.DOM */

var React    = require('react');
var Reflux   = require('reflux');
var TodoTask = require('./todotasks');

module.exports = React.createClass({
	addItem: function(evt){
		var text = evt.target.value;
		if(evt.keyCode === 13 && text){
			var data ={
				iscomplete:false,
				label     :text
			};
			TodoTask.TodoActions.addItem(data);
			console.log(data);
			evt.target.value=''
		} else if(evt.keyCode === 27){
			evt.target.value=''
		}
		evt.target.focus();
	},
	render: function(){
		return (
			<div className="todo-input">
				<span className="input-field">
					<input type="text" className="ti" placeholder="Buy Milk..." autoFocus onKeyUp={this.addItem}></input>
				</span>
			</div>
		);
	}
});
