var express = require('express');
var router = express.Router();
var xml2json = require('xml2json');
var fs = require('fs');
var path = require('path');

router.get('/all', function(req, res, next) {
    //list all track using
    //<name>test_tracking</name>
    res.json({}).send();
});

router.get('/:trackId', function(req, res, next) {
    fs.readFile(path.resolve(__dirname, '../track/', req.params.trackId + '.gpx'), function (err, data) {
        if(err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            var jsonData = JSON.parse(xml2json.toJson(data.toString('utf-8')));
            var gpx = jsonData['gpx'];
            res.json(jsonData);
        }
    });
});

module.exports = router;
