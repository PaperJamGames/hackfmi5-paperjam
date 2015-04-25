var mongoose = require('node-restful').mongoose;
var admin = require('node-django-admin');
var AudioSchema = new mongoose.Schema({
    name: String
});

AudioSchema.statics = {
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

mongoose.model('Audio', AudioSchema);

admin.add({
    path: 'audio',
    model: 'Audio',
    list: [ 'name' ],
    edit: [ 'name' ],
    fields: {
        'name': {
            header: 'Name'
        }
    }
});

module.exports = AudioSchema;