'use strict';

const axios = require('axios');

const get = async (url, config) => {
	if (!config) config = {};

	let result = await axios.get(url, config);
	if (result.status != 200) {
		throw new Error(result.statusText);
	}

	return result.data;
};

const post = async (url, params, config) => {
	if (!config) config = {};

	let result = await axios.post(url, params, config);
	if (result.status != 200) {
		throw new Error(result.statusText);
	}

	return result.data;
};

const getBase = service => {
	return 'http://' + service.port + ':' + service.port + '/' + service.endpoint;
};

module.exports = { get, post, getBase };
