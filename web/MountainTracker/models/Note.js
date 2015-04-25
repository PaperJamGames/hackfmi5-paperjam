var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = NoteSchema