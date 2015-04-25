var mongoose = require('mongoose');

var CheckpointSchema = new mongoose.Schema({
    _id: String,
    title: String,
    pictures: [{ type: String, ref: 'Picture' }],
    audio_files: [{ type: String, ref: 'Audio' }],
    video_files: [{ type: String, ref: 'Video' }],
    notes: [{ type: String, ref: 'Note' }]
});

mongoose.model('Checkpoint', CheckpointSchema);