var cozydb = require('cozydb');

const Task = cozydb.getModel('Tasky', {
    'done': {
        default: false,
        type: Boolean,
    },
    'creationDate': {
        type: Date,
    },
    'completionDate': {
        default: null,
        type: Date,
    },
    'description': {
        default: '',
        type: String,
    },
    'order': {
        type: Number,
    },
    'tags': {
        default: [],
        type: [String],
    },
    'isArchived': {
        default: false,
        type: Boolean,
    },
});

module.exports = Task;

