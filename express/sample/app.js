var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// if handlebars or swig use engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// first - templating and view 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// this is middleware 
// functions invoked by routing layer before request is handled 
app.use(logger('dev'));
// morgan - puts things in the console like response codes and response milliseconds
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// request.body to retrieve data from frontend, such as forms 
app.use(cookieParser());
// express session depends on cookieparser - parser has to be above session 
// order determines who is mounted first 
app.use(express.static(path.join(__dirname, 'public')));
// access to public folder for css images etc 
app.use('/', index);
// his example called this routes / entry point 
// look at file path on line 8 - abstracted to file - app.get or restful verbs
app.use('/users', users);

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
