var mongoose = require('node-restful').mongoose;

var CheckpointSchema = new mongoose.Schema({
    title: String,
    pictures: [{ type: String, ref: 'Picture' }],
    audio_files: [{ type: String, ref: 'Audio' }],
    video_files: [{ type: String, ref: 'Video' }],
    notes: [{ type: String, ref: 'Note' }]
});

mongoose.model('Checkpoint', CheckpointSchema);
module.exports = CheckpointSchema;