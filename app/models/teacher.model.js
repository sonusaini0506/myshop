const mongoose = require('mongoose');
var classList={className:String,classCode:String,subCode:String,subName:String}
const TeacherSchema = mongoose.Schema({
    mobile: String,
    name: String,
    subject: String,
    teachCode:String,
    classList:[classList],
    status:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Teacher', TeacherSchema);