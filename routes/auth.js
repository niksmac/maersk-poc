var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Sign In', isloggedin: (localStorage.getItem("_session")  !== null) ? true : false });
});

module.exports = router;
