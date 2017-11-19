'use strict'

const rp = require('request-promise');

require('rootpath')();
const config = require('config/config.def')();
const log = require('helpers/logger');
const app = require('app');

const NAME = 'user-service';
const ENDPOINT = 'users';
const VERSION = 1;

const register = (address) => {
  return new Promise((resolve, reject) => {
    rp
      .post('http://' + config.gateway.address + ':' + config.gateway.port + '/register')
      .form({
        name: NAME,
        endpoint: ENDPOINT,
        version: VERSION,
        host: address.address,
        port: address.port,
      })
      .then((res) => {
        res = JSON.parse(res);
        log.info(res.result);
        resolve();
      })
      .catch((err) => {
        reject(err);
      })    
  })
  
}

module.exports = { register };