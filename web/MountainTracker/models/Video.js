var mongoose = require('node-restful').mongoose;

var VideoSchema = new mongoose.Schema({
    _id: String,
    name: String
});

mongoose.model('Video', VideoSchema);
module.exports = VideoSchema;