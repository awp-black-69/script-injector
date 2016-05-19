var React  = require('react');

var MenuStrip = require('./components/menu-strip.jsx')
	,MainContent = require('./components/main-content.jsx');

var Index = React.createClass({
	render: function(){
		return (
			<div className="container">
				<MenuStrip />
				<MainContent />
			</div>
		);
	}
});

module.exports = Index;