// WEB+DB PRESS vol.87 P.136
var React    = require('react');
var Fluxxor  = require('fluxxor');

var constans = {
	UPDATE_COUNTER: "UPDATE_CONTER",
};

//Store
var CounterStore = Fluxxor.createStore({
	initialize: function() {
		this.counter = 0;
		this.bindActions(
			constants.UPDATE_COUNTER, this.onUpdateCounter
		);
	},
	
	onUpdateCounter: function(payload) {
		this.counter= this.counter + payload.value;
		this.emit('change');
	},
	
	getState: function() {
		return { counter:this.counter};
	}
	
});

//Action (Action Creater)
var actions = {
	plusCounter:function () {
		this.dispatch(constants.UPDATE_COUNTER, {value:1});
	},
	minusCounter: function () {
		this.dispatch(constants.UPDATE_COUNTER, {value:-1});
	}
};

// Reactから利用するMixin
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

// View (React)





//↓ここからReactだけのcounter

var CountApp = React.createClass({
	getInitialState : function (){
		return { counter: 0 };
	},

	handlePlus : function (){
		this.setState({ counter: this.state.counter + 1 });
	},

	handleMinus : function (){
		this.setState({ counter: this.state.counter - 1 });
	},

	render:function(){
		return (
			<div>
				<Counter value={this.state.counter}
				         onClickPlus={this.handlePlus}
				         onClickMinus={this.handleMinus} />
			</div>
		);
	}
});

var Counter = React.createClass({
	// propTypesは、Propで渡ってくる値の方をチェックしバリデーションを行うための機構です。P.131
	propTypes: {
		value:        React.PropTypes.number.isRequired,
		onClickPlus:  React.PropTypes.func.isRequired,
		onClickMinus: React.PropTypes.func.isRequired,
	},

	render: function () {
		return (
			<div>
				<span>count: {this.props.value}</span>
				<div>
					<button onClick={this.props.onClickPlus}>
					+1
					</button>
					<button onClick={this.props.onClickMinus}>
					-1
					</button>
				</div>
			</div>
		);
	}
});

React.render(
	<CountApp />,
	document.getElementById('app-container')
);
