var mongoose = require('node-restful').mongoose;

var VideoSchema = new mongoose.Schema({
    name: String
});

mongoose.model('Video', VideoSchema);
module.exports = VideoSchema;