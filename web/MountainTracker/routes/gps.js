var express = require('express');
var router = express.Router();

var mongoose = require('node-restful').mongoose;
var Checkpoint = mongoose.model('Checkpoint');
var Track = mongoose.model('Track');
var GPS = mongoose.model('GPS');
var Picture = mongoose.model('Picture');

router.post('/coord/:uuid', function(req, res, next) {
    var id = req.params['uuid'];
    var coords = req.body;
    //res.status(201).send();
    var data = new GPS({uuid:id, gpx_parsed:[coords]});
    //data['lon'] = coords['lon'];
    //data['lat'] = coords['lat'];
    data.save(function () {
        res.status(201).send();
    });
});

module.exports = router;