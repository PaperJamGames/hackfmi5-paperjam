var express = require('express');
var router = express.Router();
var restful = require('node-restful'),
    mongoose = restful.mongoose;

var UserSchema = require('../models/User');
var AudioShcema = require('../models/Audio');
var VideoShcema = require('../models/Video');
var CheckpointShcema = require('../models/Checkpoint');
var NoteShcema = require('../models/Note');
var RegionShcema = require('../models/Region');
var TrackShcema = require('../models/Track');

var AudioRest = router.resource = restful.model('Audio', AudioShcema)
    .methods(['get', 'post', 'put', 'delete']);

AudioRest.register(router, '/audio');

module.exports = this;