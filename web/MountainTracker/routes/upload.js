var router = require('express').Router();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var xml2json = require('xml2json');
var mongoose = require('node-restful').mongoose;
var Checkpoint = mongoose.model('Checkpoint');
var Track = mongoose.model('Track');
var GPS = mongoose.model('GPS');
var Picture = mongoose.model('Picture');

router.post('/gpx', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 40 * 1024 * 1024;
    persistGPXData(req, form);
    res.status(201).send();
//    form.uploadDir = path.resolve(__dirname, '../uploads');
    /*form.parse(req, function(err, fields, files) {
        if(err || !files.trackData) {
            res.status(500).end(err || 'Not a valid POST request.');
        } else {
            console.log("");
            fs.readFile(files.trackData.path, {}, function(err, data) {
                if(err) {
                    res.status(500).end("Data is corrupt");
                } else {
                    console.log(files);
                    var jsonData = JSON.parse(xml2json.toJson(data.toString('utf-8')));
                    persistGPXData(data, jsonData);
                    res.status(200).end('Upload successful.');
                }

            });
        }
    });*/
});

router.post('/image', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 40 * 1024 * 1024;
    form.uploadDir = path.resolve(__dirname, '../public/images');
    form.parse(req, function(err, fields, files) {
        console.log("test");
        if(err) {
            res.status(500).send(err);
            return;
        }
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

        var picture = new Picture();
        picture['_id'] = pictureID;
        picture['url'] = path.resolve(__dirname, '../public/images') + file.name;

        checkpoint.save();
        picture.save();

        fs.rename(file.path, path.resolve(__dirname, '../public/images', file.name), function() {
            res.status(201).send();
        });
    });
});
/*
var persistGPXData = function (gpx) {
    gpx = gpx['gpx'];

    if(!gpx){
        return;
    }
    var author = gpx['creator'];
    var trk = gpx['trk'];
    if(!trk){
        return;
    }
    var trackName = trk['name'];
    trk = trk['trkseg'];

    if(!trk){
        return;
    }
    trk = trk['trkpt'];
    if(!trk){
        return;
    }
    var checkpoints = [];
    trk.forEach(function (point) {
        checkpoint = new Checkpoint();
        var id = mongoose.Types.ObjectId();
        checkpoint['_id'] = id;
        checkpoint['data'] = point;
        checkpoints.push(id);
        var result = checkpoint.save();
        console.log(result);
    });

    track = new Track();
    track['checkpoints'] = checkpoints;
    track['title'] = trackName;
    track['author'] = author;
    track.save();
}*/

var persistGPXData = function (req, form) {

    form.parse(req, function(err, fields, files) {
        var file = files[Object.keys(files)[0]];
        var gpx_path = path.resolve(__dirname, '../gpx/maps', file.name);
        fs.rename(file.path, path.resolve(__dirname, '../gpx/maps', file.name), function () {
            fs.readFile(path.resolve(__dirname, '../gpx/maps', file.name)/*files.trackData.path*/, {}, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    var gpx = JSON.parse(xml2json.toJson(data.toString('utf-8')));

                    gpx = gpx['gpx'];

                    if(!gpx){
                        return;
                    }

                    var author = gpx['creator'];
                    var trk = gpx['trk'];

                    if(!trk){
                        return;
                    }

                    var trackName = trk['name'];
                    trk = trk['trkseg'];

                    if(!trk){
                        return;
                    }
                    trk = trk['trkpt'];
                    if(!trk){
                        return;
                    }

                    var gps = new GPS();
                    gps['gpx'] = data.toString('utf-8');
                    gps['gpx_parsed'] = trk;

                    gps['id'] = mongoose.Types.ObjectId();
                    track = new Track();
                    track['title'] = trackName;
                    track['author'] = author;
                    track['data'] = gps['id'];
                    track.save(function () {
                        gps.save();
                    });
                }
            });
        });
    });
}

module.exports = router;