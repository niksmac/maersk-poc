var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');

/* GET users listing. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('shipments', {
    title: 'Shipments',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false });
});

function isAuthenticated(req, res, next) {

    if (localStorage.getItem("_session")  !== null)
        return next();

    res.redirect('/auth');
}

module.exports = router;
