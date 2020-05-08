const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    mobile: String,
    stuName: String,
    classCode: String,
    className: String,
    stuCode:String,
    fatherName:String,
    motherName:String,
    address:String,
    aadharNumber:String,
    status:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);