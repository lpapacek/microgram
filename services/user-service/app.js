const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const log = require('./core/helpers/logger');
const sequelizeStarter = require('./core/db/dbManager');
const responseHandler = require('./core/middleware/responseHandler');
const errorHandler = require('./core/middleware/errorHandler');
const registrator = require('./core/utils/registrator');

const index = require('./routes/index');

var app = express();

app.use(morgan(':date[iso] * :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

log.info('Starting UserService...');

Promise.resolve().then(async () => {
	try {
		await sequelizeStarter.init();
	} catch (err) {
		log.error('DB error!');
	}

	// Register to API Gateway;
	try {
		await registrator.register(app.get('address'));
	} catch (err) {
		console.log(err);
		log.error('Cannot register on API Gateway!');
	}

	initRouteChain();
	log.info('UserService UP! Listening on port ' + app.get('address').port);
});

const initRouteChain = () => {
	app.use('/', index);

	app.use(responseHandler.handleResponse);
	app.use(errorHandler.handleNotFoundError);
	app.use(errorHandler.handleError);
};

module.exports = app;
