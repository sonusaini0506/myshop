const mongoose = require('mongoose');
const GamenumberSchema = mongoose.Schema({
    numberMorning: String,
    numberEvening: String,
    createdBy: String,
    payAmount:{type:String,default:"8"},
    status:{type:Boolean,default:true},
    created_At:{ type: Date, required: true, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('gamenumber', GamenumberSchema);