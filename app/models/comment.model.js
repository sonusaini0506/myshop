const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    senderCode: String,
    senderName: String,
    reciverCode: String,
    reciverName: String,
    chapter: String,
    message: String,
    type: String,
    workId: String,
    status:Boolean
}, {
    timestamps: true
});
module.exports = mongoose.model('Comment', CommentSchema);