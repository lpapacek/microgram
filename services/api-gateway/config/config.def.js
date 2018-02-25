'use strict'

var config = {
	jwtSecret: "s3cr3t",
	jwtSession: {
		session: false
	},
	jwtExpirePeriod: 60,
}

const getConfig = () => {
	try {
		var configMod = require('./config.mod');
		config = Object.assign(config, configMod);
	} catch (ex) {
		//
	}
	return config;
}

module.exports = { getConfig };