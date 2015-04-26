var mongoose = require('node-restful').mongoose;
var admin = require('node-django-admin');
var CheckpointSchema = new mongoose.Schema({
    title: String,
    data: {
        ele:Number,
        lat:Number,
        lon:Number,
        time:String
    },
    pictures: [{ type: String, ref: 'Picture' }],
    audio_files: [{ type: String, ref: 'Audio' }],
    video_files: [{ type: String, ref: 'Video' }],
    notes: [{ type: String, ref: 'Note' }]
});

CheckpointSchema.statics = {

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

mongoose.model('Checkpoint', CheckpointSchema);

admin.add({
    path: 'checkpoint',
    model: 'Checkpoint',
    list: ['title', 'pictures', 'audio_files', 'video_files', 'notes'],
    edit: ['title', 'pictures', 'audio_files', 'video_files', 'notes'],
    fields: {
        title: {
            header: 'Title'
        },
        pictures: {
            header: 'Pictures',
            widget: 'ref',
            model: 'Picture',
            display: 'name'
        },
        audio_files: {
            header: 'Audio Files',
            widget: 'ref',
            model: 'Audio',
            display: 'name'
        },
        video_files: {
            header: 'Video Files',
            widget: 'ref',
            model: 'Video',
            display: 'name'
        },
        notes: {
            header: 'Notes',
            widget: 'ref',
            model: 'Note',
            display: 'text'
        }
    }
});

module.exports = CheckpointSchema;