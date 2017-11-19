const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request = require('request');

require('rootpath')();
const config = require('config/config.def')();
const log = require('helpers/logger');
const sequelizeStarter = require('core/db/dbManager');
const responseHandler = require('core/middleware/responseHandler');
const errorHandler = require('core/middleware/errorHandler');
const registrator = require('core/utils/registrator');

const users = require('routes/users');
const index = require('routes/index');

var app = express();

app.use(morgan(':date[iso] * :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

log.info('Starting UserService...');

sequelizeStarter.init()
//Promise.resolve()
  .then(() => {
    // Register to API Gateway;
    return registrator.register(app.get('address'));
  })
  .then(() => {
    initRouteChain();
    log.info('UserService UP! Listening on port ' + app.get('address').port);
  })
  .catch((err) => {
    console.log(err);
  })

const initRouteChain = () => {
  app.use('/', index);
  app.use('/users', users);
  
  app.use(responseHandler.handleResponse);
  app.use(errorHandler.handleNotFoundError);
  app.use(errorHandler.handleError);
}

module.exports = app;
