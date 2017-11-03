'use strict'

var express = require('express')
var router = express.Router()

router.get('/health', function(req, res, next) {
	console.log('Running in: ' +	process.env.NODE_ENV)
	res.send({
		status: 'OK',
  	timestamp: Date.now()
	})
})

module.exports = router
