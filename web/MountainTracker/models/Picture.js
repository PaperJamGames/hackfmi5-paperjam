var mongoose = require('node-restful').mongoose;

var PictureSchema = new mongoose.Schema({
    _id: String,
    date: Date,
    name: String
});

mongoose.model('Picture', PictureSchema);
module.exports = PictureSchema;