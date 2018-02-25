'use strict';

const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/authController');

// Routes
router.get('/token', authController.getToken);

module.exports = router;
