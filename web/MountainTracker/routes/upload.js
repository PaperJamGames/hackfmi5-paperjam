var router = require('express').Router();

router.post('/', function(req, res, next) {
    req.status(200).end('I got this');
});

module.exports = router;