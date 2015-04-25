module.exports.models = {
    Audio: {
        id: 'Audio',
        required: 'name',
        properties: {
            _id: {
                type: 'String',
                description: 'Audio unique identifier'
            },
            name :{
                type: 'String',
                description: 'Name of the audio file.'
            }
        }
    },
    Checkpoint: {
        id: 'Checkpoint',
        required: ['title'],
        properties: {
            title :{
                type: 'String',
                description: 'Title of the checkpoint.'
            },
            pictures: {
                type: 'Array',
                items: {
                    $ref: 'Picture'
                },
                description: 'An array of pictures.'
            },
            audio_files: {
                type: 'Array',
                items: {
                    $ref: 'Audio'
                },
                description: 'An array of audio files.'
            },
            video_files: {
                type: 'Array',
                items: {
                    $ref: 'Video'
                },
                description: 'An array of video files.'
            },
            notes: {
                type: 'Array',
                items: {
                    $ref: 'Note'
                },
                description: 'An array of notes.'
            }
        }
    },
    Note: {
        id: 'Note',
        properties: {
            text: {
                type: 'String',
                description: 'The note\'s text'
            },
            author: {
                type: 'String',
                description: 'Name / Email of the author.'
            }
        }
    },
    Picture: {
        id: 'Picture',
        properties: {
            _id: {
                type: 'String',
                description: 'Picture\'s ID'
            },
            date: {
                type: 'Date',
                description: 'Date taken on.'
            },
            name: {
                type: 'String',
                description: 'Picture\'s title'
            }
        }
    },
    Region: {
        id: 'Region',
        properties: {
            regions: {
                description: 'An array of regions',
                type: 'Array',
                items: {
                    type: 'String'
                }
            }
        }
    },
    Track: {
        id: 'Track',
        properties: {
            title: {
                description: 'Track title',
                type: 'String'
            },
            author: {
                description: 'Name / Email of the author.',
                type: 'String'
            },
            picture: {
                type: 'String',
                $ref: 'Picture'
            },

            distance: {
                description: '',
                type: 'Number'
            },
            rating: {
                description: '',
                type: 'Number'
            },
            landmarkCount: {
                description: '',
                type: 'Number'
            },
            avg_duration: {
                description: '',
                type: 'Number'
            },
            checkpoints: [{ type: String, $ref: 'Picture' }]
        }
    },
    User: {},
    Video: {}
};