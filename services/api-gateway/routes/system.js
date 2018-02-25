'use strict';

const express = require('express');
const router = express.Router();

// Controllers
const systemController = require('../controllers/systemController');

// Routes
router.get('/state', systemController.systemState);
router.get('/register', systemController.registerInstance);

module.exports = router;
