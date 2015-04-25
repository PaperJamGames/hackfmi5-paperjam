var router = require('express').Router();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var xml2json = require('xml2json');

router.post('/', function(req, res, next) {
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
                    res.status(200).end('Upload successful.');
                }

            });
        }
    });

});

module.exports = router;