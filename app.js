var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var localStorage = require('localStorage');
var crypto = require('crypto');

var index = require('./routes/index');
var auth = require('./routes/auth');
var clients = require('./routes/clients');
var partners = require('./routes/partners');
var shipments = require('./routes/shipments');
var shipment_new = require('./routes/shipment-new');
var JsonDB = require('node-json-db');
var db = new JsonDB("shipping", true, false);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/clients', clients);
app.use('/partners', partners);
app.use('/shipments', shipments);
app.use('/shipment-new', shipment_new);

app.post('/login', function(request, response){
    if (request.body.email == "demo@pegke.com" && request.body.pass == "123") {
      localStorage.setItem("_session",crypto.createHash('md5').update(request.body.email).digest("hex"));
      response.redirect("/clients");
    } else {
      response.redirect("/auth");
    }
});

app.post('/shipment/create', function(request, response){
  db.push("/ship_" + request.body.id,request.body);
  response.redirect("/shipments");
});

app.get('/logout', function(req, res, next) {
  localStorage.removeItem('_session');
  res.redirect("/auth");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
