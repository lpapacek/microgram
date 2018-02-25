'use strict';

const pool = require('../core/registry/pool');

const systemState = async (req, res, next) => {
	const instances = await pool.listAll();
	res.body = {
		result: instances
	};
	next();
};

module.exports = { systemState };
