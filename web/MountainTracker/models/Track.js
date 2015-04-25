var mongoose = require('mongoose');

var TrackSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,

    picture: String,

    distance: Number,
    rating: Number,
    landmarkCount: Number,
    avg_duration: Number,

    has_audio: Boolean,
    has_photos: Boolean,
    has_videos: Boolean
});

module.exports = TrackSchema;