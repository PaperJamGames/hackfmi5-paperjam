var router = require('express').Router();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var xml2json = require('xml2json');
var mongoose = require('node-restful').mongoose;
var Checkpoint = mongoose.model('Checkpoint');
var Track = mongoose.model('Track');

router.post('/gpx', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 40 * 1024 * 1024;
//    form.uploadDir = path.resolve(__dirname, '../uploads');
    form.parse(req, function(err, fields, files) {
        if(err || !files.trackData) {
            res.status(500).end(err || 'Not a valid POST request.');
        } else {
            fs.readFile(files.trackData.path, {}, function(err, data) {
                if(err) {
                    res.status(500).end("Data is corrupt");
                } else {
                    var jsonData = JSON.parse(xml2json.toJson(data.toString('utf-8')));
                    persistGPXData(jsonData);
                    res.status(200).end('Upload successful.');
                }

            });
        }
    });
});

router.post('/image', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 40 * 1024 * 1024;
    form.uploadDir = path.resolve(__dirname, '../public/images');
    form.parse(req, function(err, fields, files) {
        console.log("");
        var file = files[Object.keys(files)[0]];
        fs.rename(file.path, path.resolve(__dirname, '../public/images', file.name));
        res.status(201).send();
    });

});

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
}

module.exports = router;