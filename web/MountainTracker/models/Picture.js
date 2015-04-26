var mongoose = require('node-restful').mongoose;
var admin = require('node-django-admin');

var PictureSchema = new mongoose.Schema({
    date: String,
    name: String,
    url: String
});

PictureSchema.statics = {

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

mongoose.model('Picture', PictureSchema);

admin.add({
    path: 'picture',
    model: 'Picture',
    list: ['name', 'date'],
    edit: ['name', 'date'],
    fields: {
        name: {
            header: 'Name'
        },
        date: {
            header: 'Date'
        }
    }
});
module.exports = PictureSchema;