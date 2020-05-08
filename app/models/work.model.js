const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema({
    code: String,
    name: String,
    classCode: String,
    subCode: String,
    subName: String,
    chapterName: String,
    remark: String,
    work: String,
    workAt: String,
    status:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Work', WorkSchema);