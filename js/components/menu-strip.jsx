var React = require('react');

var MenuStrip = React.createClass({
	render: function () {
		return (
			<div className="menu-strip">
				<div className="logo">Script Injector</div>
				<div className="toolbar">
					<div className="search-box">
						<i className="ic search" />
						<input/>
					</div>
					<a className="icon-manage" href="/index.html#options" target="_blank">
						<i className="ic setting"/>
					</a>
				</div>
			</div>
		);
	}
});

module.exports = MenuStrip;