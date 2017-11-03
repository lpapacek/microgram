var express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('rootpath')();
const config = require('config/db.def')();
const Logger = require('helpers/logger');
const sequelizeStarter = require('core/db/dbManager');
const responseHandler = require('core/middleware/responseHandler');
const errorHandler = require('core/middleware/errorHandler');

const users = require('routes/users');
const index = require('routes/index');

var app = express();

app.use(morgan(':date[iso] * :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

var log = new Logger();

log.info('Starting UserService...');

sequelizeStarter.init()
.then(() => {
	initRouteChain();
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
