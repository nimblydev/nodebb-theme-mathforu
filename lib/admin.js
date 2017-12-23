'use strict';
/* globals $, app */

define('admin/plugins/mathforu', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('mathforu', $('.mathforu-settings'));

		$('#save').on('click', function() {
			Settings.save('mathforu', $('.mathforu-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'mathforu-saved',
					title: 'Settings Saved',
					message: 'mathforu settings saved'
				});
			});
		});
	};

	return ACP;
});
