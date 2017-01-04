var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");
var JsonDB = require('node-json-db');

router.get('/', function(req, res, next) {
  var db = new JsonDB("transport", true, false);
  var data = db.getData("/");
  console.log(data);
  res.render('transport-list', {
    title: 'Inter Modal Transport',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data
  });
});

module.exports = router;
