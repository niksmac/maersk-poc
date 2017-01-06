var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var obj = require("../dummy.json");
var JsonDB = require('node-json-db');

/* GET users listing. */
router.get('/', isAuthenticated, nocache, function(req, res, next) {
  var db = new JsonDB("shipments", true, false);
  var data = db.getData("/");
  console.log(data);
  res.render('shipments', {
    title: 'Shipments',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data
  });
});

router.get('/transport/:id/create', function(req, res, next) {
  var shipid = req.params.id;
  res.render('transport', {
    title: 'Inter Modal Transport',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data : {shipid : shipid}
  });
});

router.post('/transport/:id/create', function(req, res, next) {
  var db = new JsonDB("shipments", true, false);
  var shipmentrow = Number(req.body.shipid) - 1;
  console.log(shipmentrow);
  delete req.body.submit;
  db.push("/row["+shipmentrow+"]/transport[]",req.body);
  res.redirect("/shipments/"+req.body.shipid);
});

router.get('/create', function(req, res, next) {
  var db = new JsonDB("shipments", true, false);
  var auto_increment = 1;
  try {
    var data = db.getData("/row[-1]");
    auto_increment = Number(data.id) + 1;
  } catch(error) {
  }

  res.render('all', {
    title: 'Create Shipment',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    autoKey: auto_increment
  });
});

router.post('/create', function(req, res, next) {
  var db = new JsonDB("shipments", true, false);
  delete req.body.submit;
  db.push("/row[]",req.body);
  res.redirect("/shipments");
});

router.get('/cargo', function(req, res, next) {
  res.render('cargo');
});

router.get('/clear', function(req, res, next) {
  var db = new JsonDB("shipments", true, false);
  db.delete("/");
  res.redirect("/shipments");
});

router.get('/:id', isAuthenticated, nocache, function(req, res, next) {
  var shipid = req.params.id;
  var dbPosition = (shipid - 1);
  var db = new JsonDB("shipments", true, false);
  var data = db.getData("/row["+dbPosition+"]");
  console.log(data);
  res.render('shipments-detail', {
    title: 'Shipment Details',
    isloggedin: (localStorage.getItem("_session")  !== null) ? true : false,
    data: data,
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
