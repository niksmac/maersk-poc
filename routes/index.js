var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Maersk Line - Loyalty', isloggedin: (localStorage.getItem("_session")  !== null) ? true : false });
});

function isAuthenticated(req, res, next) {

    if (localStorage.getItem("_session")  !== null)
        return next();

    res.redirect('/auth');
}

module.exports = router;
