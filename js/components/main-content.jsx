var _ = require('underscore')
	,React = require('react')
	,async = require('async');

var store = require('../core/store');

var Loader = require('./loader.jsx')
	,InjectScript = require('./inject-script.jsx');

var MainContent = React.createClass({
	getInitialState: function () {
		return {
			
		};
	},

	getScriptList: function () {
		var self = this
			,scriptsEl;

		console.log("SSSS", self.state.loadedScripts);

		scriptsEl = _.map(this.state.scripts, function (script) {
			return (
				<InjectScript data={script} loadedScripts={self.state.loadedScripts} key={script.id} />
			);
		});

		return scriptsEl;
	},
	queryScript: function (cb) {
		store
			.getScripts(function (data) {
				cb(null, data);
			});
	},
	queryLoadedScripts: function (cb) {
		var cbTimeout;

		cbTimeout = setTimeout(function () {
			cbTimeout = null;
			cb(null, []);
		}, 1000);

		chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
			if(!_.at(tabs, '0.id')) {
				clearTimeout(cbTimeout);
				cbTimeout = null;
				cb(null, []);
				return;
			}
			chrome.tabs.sendMessage(tabs[0].id, {action: "query"}, function (data) {
				if(cbTimeout) {
					cb(null, data);
					clearTimeout(cbTimeout);
					cbTimeout = null;
				}
			});
		});
	},

	componentDidMount: function () {
		var self = this
			,tasks;

		tasks = [
			this.queryScript,
			this.queryLoadedScripts
		];

		async.parallel(tasks, function (errs, results) {
			console.log("Res", results);
			self.setState({
				scripts: results[0],
				loadedScripts: results[1]
			});
		});
		// store
		// 	.getScripts(function (data) {
		// 		self.setState({
		// 			scripts: data
		// 		});
		// 	});
	},
	render: function () {
		return (
			<div className="main-content">
				{
					this.state.scripts ?
						this.getScriptList() :
						<Loader />
				}
			</div>
		);
	}
});

module.exports = MainContent;