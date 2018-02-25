'use strict'

const passport = require("passport");  
const passportJWT = require("passport-jwt"); 
const jwt = require("jwt-simple"); 
const moment = require('moment'); 

require('rootpath')();
const config = require('config/config.def').getConfig();
const pool = require('core/registry/pool');

const ExtractJwt = passportJWT.ExtractJwt;  
const JWTStrategy = passportJWT.Strategy;

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}

const setup = () => {
  console.log('setup!');
  var strategy = new JWTStrategy(params, function(payload, done) {
    // check token status or user privileges if needed
    // this fn is called on every request
    console.log('PL: ', payload);
    return done(null, {});
  });
  passport.use(strategy);
}

const initialize = () => {
  return passport.initialize();
}

const authenticate = () => {
  return passport.authenticate('jwt', config.jwtSession);
}

const getToken = (userData) => {
  let now = moment().format('X');
  let payload = {
    iss: 'microgram',
    sub: userData.username,
    iat: now,
    exp: parseInt(now) + config.jwtExpirePeriod,
  };

  let token = jwt.encode(payload, config.jwtSecret);
  let refreshToken = 'xyz';
  return { token, refreshToken };
}

module.exports = { setup, initialize, authenticate, getToken }