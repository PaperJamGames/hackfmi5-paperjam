var mongoose = require('mongoose');

var AudioSchema = new mongoose.Schema({
    _id: String,
    name: String
});

mongoose.model('Audio', AudioSchema);