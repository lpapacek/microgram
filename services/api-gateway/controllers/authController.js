'use strict';

const auth = require('../core/security/auth');

const getToken = (req, res, next) => {
	let token = auth.getToken({ id: 'lp' });
	res.body = {
		result: token
	};
	next();
};

module.exports = { getToken };
