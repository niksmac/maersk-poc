var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");
var JsonDB = require('node-json-db');

router.get('/', function(req, res, next) {

  var db = new JsonDB("settings", true, false);
  var data = db.getData("/");
  res.render('settings', {
    title: 'Global Settings',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data
  });
});


module.exports = router;
