var mongoose = require('node-restful').mongoose;
var admin = require('node-django-admin');

var NoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

NoteSchema.statics = {

    load: function(id, cb) {
        this.findOne({ _id : id })
            .exec(cb);
    },

    list: function (options, cb) {
        var criteria = options.criteria || {};
        var order = options.order || {'text': 1};

        this.find(criteria)
            .sort(order)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }

};

mongoose.model('Note', NoteSchema);

admin.add({
    path: 'note',
    model: 'Note',
    list: [ 'text', 'author' ],
    edit: [ 'text', 'author' ],
    fields: {
        text: {
            header: 'Text'
        },
        author: {
            header: 'Author'
        }
    }
});

module.exports = NoteSchema;