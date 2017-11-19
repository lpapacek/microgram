'use strict'

var express = require('express');
var router = express.Router();

require('rootpath')();
let pool = require('core/registry/pool');
const Logger = require('helpers/logger');
const rest = require('core/lib/restWrapper');


router.get('/', function (req, res, next) {
  res.body = {
    result: [ {a: 'b'}, {c: 2}]
  };
  next();
});

router.post('/register', function (req, res, next) {
  pool.addInstance(req.body);
  res.body = {
    result: 'Welcome from API Gateway! You are public and safe.'
  };
  next();
});

router.get('/system', function (req, res, next) {
  const instances = pool.listAll();
  console.log(instances);
  res.body = {
    result: instances
  };
  next();
});

router.post('/login', async function (req, res, next) {
  let users = pool.getInstance('user-service');
  if (! users) {
    next(new Error('Service not found'));
    return;
  }

  try { 
    let loginRes = await rest.post(`http://${users.host}:${users.port}/${users.endpoint}/login`, req.body);
    res.body = loginRes;
    next();
  } catch(e) {
    next(e);
  }

});

module.exports = router;
