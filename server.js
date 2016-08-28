var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//routes
var userApi= require('./server/routes/userApi');
var expenseApi = require('./server/routes/expenseApi');
var routes = require('./server/routes/index');

//db

//auth
var passport = require("passport");
//db config
var config = require("./server/config/database");
var mongoose = require('mongoose');
mongoose.connect(config.database);
var User = require("./server/models/userModel");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Use the passport package
app.use(passport.initialize());
require('./server/config/passport')(passport);

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

//routing
app.use('/api/expense',expenseApi);
app.use('/api/user/', userApi);
app.use('/src/', express.static(path.join(__dirname, '/src')));
app.use('/bower_components/', express.static(path.join(__dirname, '/bower_components')));
app.use('/views/', express.static( path.join(__dirname,'/views')));
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: true,message: err.message,err: err});
  
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({success: false,error: true,
    message: 'There seems to be an error in your request'});
  
});


module.exports = app;
