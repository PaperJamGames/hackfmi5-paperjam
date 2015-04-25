var mongoose = require('mongoose');

var RegionSchema = new mongoose.Schema({
    _id: String,
    regions: [{type:String}]
});

mongoose.model('Region', RegionSchema);