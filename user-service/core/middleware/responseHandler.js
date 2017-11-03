'use strict'

const handleResponse = (req, res, next) => {
  if (!res.body) {
    // 404
    next();
    return;
  }

  if (res.body.error !== null) {
    let err = new Error('Internal error');
    err.status = 500;
    next(err);
    return;
  }
  
  res.send(res.body);
}

module.exports = { handleResponse };