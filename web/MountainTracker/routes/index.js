var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Mountain Tracker' });
});

//router.get('/admin', function(req, res, next) {
//    res.render('admin');
//});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

module.exports = router;
