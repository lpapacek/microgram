'use strict'

const handleNotFoundError = (req, res, next) => {
  var err = new Error('Endpoint not found');
  err.status = 404;
  next(err);
}

const handleError = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send();
}

module.exports = { handleNotFoundError, handleError };