'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../core/security/auth');

// Routers
const systemRouter = require('./system');
const authRouter = require('./auth');

// Routes
router.use('/system', systemRouter);
router.use('/auth', authRouter);

router.get('/', auth.authenticate(), function(req, res, next) {
	res.body = {
		result: 'Hello from API Gateway!'
	};
	next();
});

/*router.post('/login', async (req, res, next) => {
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
});*/

module.exports = router;
