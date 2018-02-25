const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const log = require('./core/helpers/logger');
const responseHandler = require('./core/middleware/responseHandler');
const errorHandler = require('./core/middleware/errorHandler');
const auth = require('./core/security/auth');
const index = require('./routes/index');

var app = express();

app.use(morgan(':date[iso] * :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

auth.setup();
app.use(auth.initialize());

log.info('Starting API Gateway...');

const initRouteChain = () => {
	app.use('/', index);

	app.use(responseHandler.handleResponse);
	app.use(errorHandler.handleNotFoundError);
	app.use(errorHandler.handleError);
};

log.info('API Gateway running!');
initRouteChain();
//serviceChecker.start();

module.exports = app;
