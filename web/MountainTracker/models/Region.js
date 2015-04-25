var mongoose = require('node-restful').mongoose;

var RegionSchema = new mongoose.Schema({
    regions: [{type:String}]
});

mongoose.model('Region', RegionSchema);
module.exports = RegionSchema;