'use strict';

const winston = require('winston');

const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			timestamp: function() {
				return new Date().toJSON();
			},
			formatter: function(options) {
				return (
					options.timestamp() +
					' - ' +
					options.level.toUpperCase() +
					': ' +
					(undefined !== options.message ? options.message : '') +
					(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
				);
			},
			level: 'debug'
		})
	],
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3
	}
});

module.exports = logger;
