'use strict';

const express = require('express');
const router = express.Router();

// Routers
const userRouter = require('./users');

router.use('/users', userRouter);

router.get('/pulse', (req, res, next) => {
	res.body = {
		status: 'OK'
	};
	next();
});

router.get('/health', function(req, res) {
	console.log('Running in: ' + process.env.NODE_ENV);
	res.send({
		status: 'OK',
		timestamp: Date.now()
	});
});

module.exports = router;
