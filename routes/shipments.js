var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");
var JsonDB = require('node-json-db');

/* GET users listing. */
router.get('/', isAuthenticated, nocache, function(req, res, next) {
  var db = new JsonDB("shipments", true, false);
  var data = db.getData("/");
  res.render('shipments', {
    title: 'Shipments',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data
  });
});


router.get('/create', function(req, res, next) {
  res.render('all', {title: 'Create Shipment'});
});

router.post('/create', function(req, res, next) {
  var db = new JsonDB("shipments", true, false);
  delete req.body.submit;
  db.push("/row"+req.body.id,req.body);
  res.redirect("shipments");
});

router.get('/cargo', function(req, res, next) {
  res.render('cargo');
});

router.get('/transport', function(req, res, next) {
  res.render('transport', {title: 'Inter Modal Transport'});
});

router.post('/transport', function(req, res, next) {
  var db = new JsonDB("settings", true, false);
  console.log(req.body);
  // delete req.body.submit;
  // db.push("/",req.body);
  // res.redirect("shipments/transport");
});

router.get('/:id', isAuthenticated, nocache, function(req, res, next) {
  var shipid = req.params.id;
  var db = new JsonDB("shipping", true, false);
  var data = db.getData("/");
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
