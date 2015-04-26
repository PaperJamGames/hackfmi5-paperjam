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
    var data = new GPS({uuid:id, gpx_parsed:[coords]});

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
});

router.post('/checkpoint/:uuid', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 40 * 1024 * 1024;
    form.uploadDir = path.resolve(__dirname, '../public/images');
    form.parse(req, function(err, fields, files) {
        var pictureID = mongoose.Types.ObjectId();
        var title = fields['title'];
        var lat = fields['lat'];
        var lon = fields['lon'];
        var ele = fields['ele'];
        var time = fields['time'];
        var note = fields['note'];
        var file = files[Object.keys(files)[0]];
        var checkpoint = new Checkpoint();

        checkpoint['data'] = {
            "lat":lat,
            "lon":lon,
            "ele":ele,
            "time":time
        };

        checkpoint['note'] = note;
        checkpoint['pictures'] = [pictureID];
        checkpoint['uuid'] = req.params['uuid'];

        var picture = new Picture();
        picture['_id'] = pictureID;
        picture['url'] = path.resolve(__dirname, '../public/images') + file.name;

        checkpoint.save();
        picture.save();

        fs.rename(file.path, path.resolve(__dirname, '../public/images', file.name));
        res.status(201).send();
    });
});

module.exports = router;