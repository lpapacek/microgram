var express = require('express');
var router = express.Router();
const ejs = require('ejs');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
  /*
  var loginPart = fs.readFileSync(__dirname + '/../views/login.ejs', 'utf8');
  res.render('login', { 
    title: 'Login',
    content: ejs.render(loginPart)
  });
  */
});

router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Login',
  });
});

router.post('/login', function(req, res, next) {
  let userFound = false;
  console.log(req.body);
  if (userFound) {
    res.redirect('/users');
  } else {
    res.render('login', { 
      title: 'Login',
      error: 'User not found.'
    });
  }
});

module.exports = router;
