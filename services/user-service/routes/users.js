'use strict';

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.list);
router.get('/:id', usersController.getById);

/*
router.post('/login', async (req, res, next) => {
	try {
		let user = await userRepository.findByUsername(req.body.username);
		if (user && user.password === req.body.password) {
			res.body = { result: user };
		} else {
			res.body = { result: null };
		}

		next();
	} catch (e) {
		console.log(e);
		next(e);
	}
});*/

module.exports = router;
