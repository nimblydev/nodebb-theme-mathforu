'use strict';
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		//require.main.require('benchpressjs');
		 module.exports = factory( require.main.require('benchpressjs'));

	} else {
		//require(['benchpress'], factory);
		define('helpers', ['benchpress'], function (Benchpress) {
			return factory(Benchpress);
		});
	}
}(function (Benchpress) {
// }(function (util, Benchpress) {

	const logger = (data) => {
		console.log('Logger helper', data);
		return '';
	};

	function register() {
		// console.log(` Benchpress before registration : ${util.inspect(Benchpress, false, null, true /* enable colors */)}`)
		Object.keys(customHelpers).forEach(function (helperName) {
			Benchpress.registerHelper(helperName, customHelpers[helperName]);
		});
		//console.log(` Benchpress in custom helpers file : ${util.inspect(Benchpress, false, null, true /* enable colors */)}`)
	};


	function obfuscateUrl(joiner = '/', ...args) {
		const cleanString = args.join(joiner).replace(/([\/.'-,])\1+/gi, joiner);
		console.log(cleanString);
		let buff = new Buffer(cleanString);
		const base64Url = buff.toString('base64');
		return base64Url;
	};

	const customHelpers = {
		'register': register,
		'logger': logger,
		'obfuscateUrl': obfuscateUrl
	};

	//register();
	//console.log(`====================== Custom helpers registation ======================`);

	// if (typeof module === 'object' && module.exports) {
	// 	console.log(` customHelpers : ${util.inspect(customHelpers, false, null, true /* enable colors */)}`)
	// 	module.exports = customHelpers;
	// }

	//return customHelpers;

	register();

	if (typeof module === 'object' && module.exports) {
		module.exports = customHelpers;
	}
	return customHelpers

}));
