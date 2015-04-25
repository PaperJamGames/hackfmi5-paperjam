var express = require('express');
var router = express.Router();
var requiresAuthentication = require('../auth/auth');

router.get('/needs/login', requiresAuthentication, function(req, res, next) {
    res.render('index', { title: '' });
});

module.exports = router;