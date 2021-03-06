var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var evercookie = require('evercookie');
var bodyParser = require('body-parser');
// var redis = require("redis");
// var client = redis.createClient(6379, '127.0.0.1');
var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
var mongoose = require('mongoose').connect('mongodb://localhost/tracking-test');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(evercookie.backend());
app.use(cookieParser());
app.use(session({
  // store: new RedisStore({
  //   client: client,
  //   db: 15
  // }),∂
  secret: 'tracking-test',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 5
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Remove "x-powered-by"
app.disable('x-powered-by');

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
