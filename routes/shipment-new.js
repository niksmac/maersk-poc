var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");

router.get('/', isAuthenticated, function(req, res, next) {
  console.log(obj);
  res.render('shipment-new', {
    title: 'Create new shipment',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: obj
  });
});

function isAuthenticated(req, res, next) {

    if (localStorage.getItem("_session")  !== null)
        return next();

    res.redirect('/auth');
}

module.exports = router;
