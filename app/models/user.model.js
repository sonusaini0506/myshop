const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    mobile: String,
    name: String,
    password: String,
    status:{type:Boolean,default:true},
    created_At:{ type: Date, required: true, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);