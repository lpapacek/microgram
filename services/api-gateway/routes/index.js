'use strict';

var express = require('express');
var router = express.Router();

require('rootpath')();
let pool = require('../core/registry/pool');
const Logger = require('../helpers/logger');
const rest = require('../core/lib/restWrapper');
const auth = require('../core/security/auth');
const Token = require('../models/token');

router.get('/token', function(req, res, next) {
	let token = auth.getToken({ id: 'lp' });
	res.body = {
		result: token
	};
	next();
});

router.get('/', auth.authenticate(), function(req, res, next) {
	res.body = {
		result: 'Hello from API Gateway!'
	};
	next();
});

router.post('/register', function(req, res, next) {
	pool.addInstance(req.body);
	res.body = {
		result: 'Welcome from API Gateway! You are public and safe.'
	};
	next();
});

router.get('/system', function(req, res, next) {
	const instances = pool.listAll();
	console.log(instances);
	res.body = {
		result: instances
	};
	next();
});

router.post('/login', async (req, res, next) => {
	let userService = pool.getInstance('user-service');
	if (!userService) {
		res.status(503).send('Service not available.');
		//  return;
	}

	let user = null;
	try {
		user = await rest.post(rest.getBase(userService) + '/login', req.body);
	} catch (e) {
		next(e);
		return;
	}

	if (!user) {
		// throw 401
	}

	// Issue JWT token
	let jwtObj = auth.getToken(user);
	res.body = {
		token: jwtObj.token,
		refresh_token: jwtObj.refreshToken
	};

	next();
});

module.exports = router;
