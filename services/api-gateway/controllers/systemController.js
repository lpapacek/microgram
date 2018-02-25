'use strict';

const pool = require('../core/registry/pool');

const systemState = (req, res, next) => {
	const instances = pool.listAll();
	console.log(instances);
	res.body = {
		result: instances
	};
	next();
};

const registerInstance = (req, res, next) => {
	pool.addInstance(req.body);
	res.body = {
		result: 'Welcome from API Gateway! You are public and safe.'
	};
	next();
};

module.exports = { systemState, registerInstance };
