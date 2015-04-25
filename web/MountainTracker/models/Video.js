var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
    _id: String,
    name: String
});

mongoose.model('Video', VideoSchema);