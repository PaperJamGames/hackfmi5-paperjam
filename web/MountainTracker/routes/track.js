var express = require('express');
var router = express.Router();

router.get('/all', function(req, res, next) {
    //list all track using
    //<name>test_tracking</name>
    res.json({}).send();
});

router.get('/:trackId', function(req, res, next) {
    //serve track <name>trackId</name>
    var trackId = req.params['trackId'];
    console.log(trackId);
    res.json(trackId).send;
});

module.exports = router;
