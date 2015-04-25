var mongoose = require('node-restful').mongoose;

var AudioSchema = new mongoose.Schema({
    name: String
});

mongoose.model('Audio', AudioSchema);
module.exports = AudioSchema;