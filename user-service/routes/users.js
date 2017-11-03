'use strict'

const express = require('express')
var router = express.Router()

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
	.get('/', async (req, res, next) => {
		let users = null; 
		let err = null;
		try {
			users = await userRepository.findUsers();
		} catch(e) {
			err = e;
		}
		res.body = { error: err, result: users };
		next();
	})

module.exports = router
