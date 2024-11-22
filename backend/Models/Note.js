const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    location: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'created by is required']
    }
})

const Note = mongoose.model('Notes',noteSchema);

module.exports = Note;
