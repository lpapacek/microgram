'use strict';

const uuidv4 = require('uuid/v4');

const axios = require('axios');
const consul = require('consul');

const config = require('../../config/config.def')();
const log = require('../helpers/logger');

const NAME = 'user-service';
const ENDPOINT = 'users';
const VERSION = 1;

const register = async address => {
	console.log(address);
	const consulObj = consul({
		host: '127.0.0.1',
		port: 8500,
		secure: false,
		promisify: true
	});

	const id = uuidv4();
	const res = await consulObj.agent.service.register({
		name: 'users-service',
		id: id,
		tags: ['users', 'service'],
		address: '127.0.0.1',
		port: address.port,
		check: {
			name: `users-service ${address.port}`,
			http: `http://localhost:${address.port}/health`,
			tls_skip_verify: false,
			method: 'GET',
			header: { 'x-foo': ['bar', 'baz'] },
			interval: '10s',
			timeout: '1s'
		}
	});
	console.log(res);

	process.on('SIGINT', () => {
		console.log('SIGINT. De-Registering...');
		let details = { id: id };

		consulObj.agent.service.deregister(details, err => {
			console.log('de-registered.', err);
			process.exit();
		});
	});

	return res;
};

module.exports = { register };
