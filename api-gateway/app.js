var express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('rootpath')();
const log = require('helpers/logger');
const responseHandler = require('core/middleware/responseHandler');
const errorHandler = require('core/middleware/errorHandler');
const serviceChecker = require('core/registry/checker');

const index = require('routes/index');

var app = express();

app.use(morgan(':date[iso] * :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

log.info('Starting API Gateway...');

//sequelizeStarter.init()
Promise.resolve()
.then(() => {
  log.info('API Gateway running!');
  initRouteChain();
  serviceChecker.start();
})
.catch((err) => {
	console.log(err);
})

const initRouteChain = () => {
  app.use('/', index);
  
  app.use(responseHandler.handleResponse);
  app.use(errorHandler.handleNotFoundError);
  app.use(errorHandler.handleError);
}

module.exports = app;
