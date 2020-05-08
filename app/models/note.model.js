const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    mobile: String,
    name: String,
    content: String,
    status:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);