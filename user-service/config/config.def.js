var settings = {
	gateway: {
		address: '127.0.0.1',
		port: 3000
	}
}

var getConfig = () => {
	try {
		var configMod = require('./config.mod');
		settings = Object.assign(settings, configMod);
	} catch (ex) {
		//
	}
	return settings;
}

module.exports = getConfig;