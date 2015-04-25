var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
    _id: String,
    date: Date,
    name: String
});

module.exports = PictureSchema;