var mongoose = require('mongoose');

var CheckpointSchema = new mongoose.Schema({
    title: String,

    pictures: Array,

    audio_files: Array,
    video_files: Array,

    notes: Array
});

module.exports = CheckpointSchema;