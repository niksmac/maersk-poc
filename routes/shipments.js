var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");
var JsonDB = require('node-json-db');
var db = new JsonDB("myDataBase", true, false);
var data = db.getData("/");

console.log(obj.partner[0]);
/* GET users listing. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('shipments', {
    title: 'Shipments',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data,
    users: obj});
});

function isAuthenticated(req, res, next) {

    if (localStorage.getItem("_session")  !== null)
        return next();

    res.redirect('/auth');
}

module.exports = router;
