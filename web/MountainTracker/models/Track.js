var mongoose = require('node-restful').mongoose;

var TrackSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,

    picture: { type: String, ref: 'Picture' },

    distance: Number,
    rating: Number,
    landmarkCount: Number,
    avg_duration: Number,

    checkpoints: [{ type: String, ref: 'Picture' }]
});

mongoose.model('Track', TrackSchema);
module.exports = TrackSchema;