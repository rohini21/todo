/** @jsx React.DOM */

var React      = require('react');
var Reflux     = require('reflux');
var TodoTask   = require('./todotasks');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			label     : null,
			isComplete: false
		};
	},
	componentWillMount :function(){
		this.setState(this.props.item);
	},
	remove: function(){
		TodoTask.TodoActions.removeItem(this.state);
		console.log(this.state);
	},
	toggle: function(){
		TodoTask.TodoActions.toggleItem(this.state);
	},
	render: function(){
		var isCompleted = this.state.iscomplete;
		return (
			<li className="blue lighten-5 todo-item">
				<div className="li-wrapper cf">
					<div className="icon drag">
						<i className="mdi-navigation-more-vert sort"></i>
					</div>
					<div className="icon check">
						<input type="checkbox" checked={!!this.state.iscomplete} onChange={this.toggle} id={this.state.uid}>
						</input>
						<label htmlFor={this.state.uid}></label>					
					</div>
					<div className={isCompleted ? 'complete' :'' + 'grey-text text-darken-2 item'}>{this.state.label}</div>
					<i className="mdi-content-clear del" onClick={this.remove}></i>
				</div>
			</li>
		);
	}
});
