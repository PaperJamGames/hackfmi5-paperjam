var mongoose = require('node-restful').mongoose;
//TODO:
//да се добавят методи:
//POST/put /checkpoint/:id/picture
//POST   - /checkpoint/:id/audio
//POST   - /checkpoint/:id/video
//POST   - /checkpoint/:id/note
//DELETE - /checkpoint/:id/picture/:id
//DELETE - /checkpoint/:id/audio/:id
//DELETE - /checkpoint/:id/video/:id
//DELETE - /checkpoint/:id/note/:id
var CheckpointSchema = new mongoose.Schema({
    title: String,
    data: {
        ele:Number,
        lat:Number,
        lon:Number,
        time:String
    },
    pictures: [{ type: String, ref: 'Picture' }],
    audio_files: [{ type: String, ref: 'Audio' }],
    video_files: [{ type: String, ref: 'Video' }],
    notes: [{ type: String, ref: 'Note' }]
});

mongoose.model('Checkpoint', CheckpointSchema);
module.exports = CheckpointSchema;