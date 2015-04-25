var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongostore')(session);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//import models
require('./models/User');

var User = mongoose.model('User');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoStoreOptions = {
    "host": "127.0.0.1", // required
    "port": 27017, // required
    'db': 'test',
    'stringify': false,
    'collection': 'sessions',
    'expireAfter': 20 * 60 * 1000, // 20 minutes
    'autoReconnect': false,
    'ssl': false,
    'w': 1
};
app.use(session({
    secret: '1234567890QWERTY', store: new MongoStore(mongoStoreOptions)
}));

app.post('/login', function(req, res){
    var username = req.body['username'];
    var password = req.body['password'];
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            res.status(401).send();
            return;
        }
        if (!user.validPassword(password)) {
            res.status(401).send();
            return;
        }
        req.session['user'] = username;
        res.status(200).send();
    });
});

var routes = require('./routes/index');
var users = require('./routes/users');
var tracks = require('./routes/track');

app.use('/', routes);
app.use('/tracks', tracks);
app.use('/users', users);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
