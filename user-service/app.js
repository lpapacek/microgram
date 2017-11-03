var express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('rootpath')();
var config = require('config/db.def')();
var Logger = require('helpers/logger');
var sequelizeStarter = require('core/db/sequelizeStarter');

var users = require('routes/users');
var index = require('routes/index');

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
	// 
})
.catch((err) => {
	console.log(err);
})

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
