var mongoose = require('mongoose');

var RegionSchema = new mongoose.Schema({
    _id: String,
    regions: Array
});

module.exports = RegionSchema;