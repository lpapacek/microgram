'use strict'

const express = require('express')
var router = express.Router()
const sha1 = require('sha1');

require('rootpath')();
const userRepository = require('repositories/users');

router.get('/health', function(req, res, next) {
	console.log('Running in: ' +	process.env.NODE_ENV)
	res.send({
		status: 'OK',
  	timestamp: Date.now()
	})
})

router
	.get('/list', async (req, res, next) => {
		let users = null; 
		let err = null;
		try {
			users = await userRepository.findAll();
		} catch(e) {
			err = e;
		}
		res.body = { error: err, result: users };
		next();
	})

router.post('/login', async (req, res, next) => {
	try {
		let user = await userRepository.findByUsername(req.body.username);
		if (user && user.password === req.body.password) {
			res.body = { result: user }
		} else {
			res.body = { result: null	}
		}
		
		next();
	} catch(e) {
		console.log(e);
		next(e);
	}
})
	

module.exports = router
