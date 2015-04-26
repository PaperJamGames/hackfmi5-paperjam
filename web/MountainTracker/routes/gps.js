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
    delete coords['name'];
    //res.status(201).send();
    var data = new GPS({uuid:id, gpx_parsed:[coords]});
    //data['lon'] = coords['lon'];
    //data['lat'] = coords['lat'];
/*    data.save(function () {
        res.status(201).send();
    });*/
    data = data.toObject();
    delete data._id;

    GPS.findOne({uuid:id}, function (err, gps) {
        var _id;
        if (!gps) {
            _id = mongoose.Types.ObjectId();
        } else {
            _id = gps['id'];
        }

        Track.update({"data": _id}, {title:id, data: _id}, {upsert: true}, function () {
            GPS.update({uuid: id, _id:_id}, {$push: {gpx_parsed: coords}}, {upsert: true}, function (err, result) {
                res.status(201).send();
            });
        });
    });
/*
    GPS.findOne({uuid:id}, function (err, gps) {
        console.log(gps);
        var id;
        if(!gps){
            id = new mongoose.Types.ObjectId();
        } else {
            id = gps['id'];
        }
        Track.update({"data":id},{data:id},{upsert:true}, function () {
            GPS.update({uuid:id},{$push:{gpx_parsed:coords}},{upsert:true}, function (err, result) {
                res.status(201).send();
            });
        });
    });*/
});

module.exports = router;