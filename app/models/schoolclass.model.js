const mongoose = require('mongoose');
var teachList={teachName:String,teachCode:String,subCode:String,subName:String}
var subjectList={subCode:String,subName:String}
const ClassSchema = mongoose.Schema({
    className: String,
    classCode: String,
    subjectList:[subjectList],
    techList:[teachList],
    status:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('SchoolClass', ClassSchema);