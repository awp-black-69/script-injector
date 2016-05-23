var React = require('react')
	,su = require('superagent');

var MenuStrip = React.createClass({
	render: function () {

		chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tab) {
			console.log(window.ttt  = tab);
		});

		// su
		// 	.get('https://code.jquery.com/jquery-1.12.3.min.js')
		// 	.then(function (data) {
		// 		console.log(data.text);
		// 	});

		return (
			<div className="menu-strip">
				<div className="logo">Script Injector</div>
				<div className="toolbar">
					<div className="search-box">
						<i className="ic search" />
						<input autoFocus={false} />
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