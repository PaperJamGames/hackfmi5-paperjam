var mongoose = require('node-restful').mongoose;
var admin = require('node-django-admin');

var TrackSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,

    picture: { type: String, ref: 'Picture' },

    distance: Number,
    rating: Number,
    landmarkCount: Number,
    avg_duration: Number,

    checkpoints: [{ type: String, ref: 'Checkpoint' }]
});

TrackSchema.statics = {

    load: function(id, cb) {
        this.findOne({ _id : id })
            .exec(cb);
    },

    list: function (options, cb) {
        var criteria = options.criteria || {};
        var order = options.order || {'title': 1};

        this.find(criteria)
            .sort(order)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }

};

mongoose.model('Track', TrackSchema);

admin.add({
    path: 'track',
    model: 'Track',
    list: ['title', 'author', 'description' ],
    edit: ['title', 'author', 'description', 'picture', 'distance', 'rating', 'landmarkCount', 'avg_duration', 'checkpoints'],
    fields: {
        title: {
            header: "Title"
        },
        author: {
            header: "Author"
        },
        description: {
            header: "Description"
        },
        picture: {
            header: 'Picture',
            widget: 'ref',
            model: 'Picture',
            display: 'name'
        },
        distance: {
            header: "Distance"
        },
        rating: {
            header: "Rating"
        },
        landmarkCount: {
            header: "Number of Landmarks"
        },
        avg_duration: {
            header: "Average duration of trip"
        },
        checkpoints: {
            header: "Checkpoints",
            widget: 'ref',
            model: 'Checkpoint',
            display: 'title'
        }
    }
});

module.exports = TrackSchema;