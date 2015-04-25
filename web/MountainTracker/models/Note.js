var mongoose = require('node-restful').mongoose;

var NoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

mongoose.model('Note', NoteSchema);
module.exports = NoteSchema;