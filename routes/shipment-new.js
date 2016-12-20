var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");
var JsonDB = require('node-json-db');
var db = new JsonDB("shipping", true, false);
var data = db.getData("/");
var keys = Object.keys(data);
var last = keys[keys.length-1];
var next_id = 1;
if (typeof last != 'undefined'){
 next_id = (parseInt(last.split("_")[1]) + 1);
}


router.get('/', isAuthenticated, function(req, res, next) {
  res.render('shipment-new', {
    title: 'Create new shipment',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: obj,
    next_id: next_id
  });
});

function isAuthenticated(req, res, next) {

    if (localStorage.getItem("_session")  !== null)
        return next();

    res.redirect('/auth');
}

module.exports = router;
