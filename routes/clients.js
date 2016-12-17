var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('clients', { title: 'Clients' });
});

module.exports = router;
