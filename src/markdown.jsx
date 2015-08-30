var React    = require('react');
var mdparser = require('markdown').markdown;

var App = React.createClass({
	getInitialState : function (){
		return { markdown: "" };
	},

	updateMarkdown : function (markdown){
		this.setState({ markdown: markdown });
	},

	render:function(){
		return (
			<div>
				<TextInput onChange={this.updateMarkdown} />
				<Markdown markdown={this.state.markdown} />
			</div>
		);
	}
});

var TextInput = React.createClass({
	// propTypesは、Propで渡ってくる値の方をチェックしバリデーションを行うための機構です。P.131
	propTypes:{
		onChange: React.PropTypes.func.isRequired
	},

	_onChange: function (e) {
		this.props.onChange(e.target.value);
	},

	render: function () {
		return (
			<textarea onChange={this._onChange}>
			</textarea>
		);
	}
});

var Markdown = React.createClass({
	propTypes: {
		markdown:React.PropTypes.string.isRequired
	},

	render: function () {
		var html = mdparser.toHTML(this.props.markdown);

		return (
			<div dangerouslySetInnerHTML={{__html:html}}></div>
		);
	}
});

React.render(
	<App />,
	document.getElementById('app-container')
);
