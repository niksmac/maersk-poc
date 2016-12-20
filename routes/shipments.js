var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");
var JsonDB = require('node-json-db');
var db = new JsonDB("shipping", true, false);
var data = db.getData("/");

/* GET users listing. */
router.get('/', isAuthenticated, nocache, function(req, res, next) {
  res.render('shipments', {
    title: 'Shipments',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data
  });
});

router.get('/:id', isAuthenticated, nocache, function(req, res, next) {
  var shipid = req.params.id;
  res.render('shipments-detail', {
    title: 'Shipment Details',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data["ship_"+shipid],
    users: obj
  });
});

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

function isAuthenticated(req, res, next) {

    if (localStorage.getItem("_session")  !== null)
        return next();

    res.redirect('/auth');
}

module.exports = router;
