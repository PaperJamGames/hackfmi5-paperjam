var mongoose = require('node-restful').mongoose;
var admin = require('node-django-admin');

var VideoSchema = new mongoose.Schema({
    name: String,
    url: String
});

VideoSchema.statics = {

    load: function(id, cb) {
        this.findOne({ _id : id })
            .exec(cb);
    },

    list: function (options, cb) {
        var criteria = options.criteria || {};
        var order = options.order || {'name': 1};

        this.find(criteria)
            .sort(order)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }

};

mongoose.model('Video', VideoSchema);

admin.add({
    path: 'video',
    model: 'Video',
    list: ['name'],
    edit: ['name'],
    fields: {
        name: {
            header: 'Name'
        }
    }
});

module.exports = VideoSchema;