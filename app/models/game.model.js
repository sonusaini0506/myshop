const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    mobile: String,
    name: String,
    playAmount: String,
    gameNumber:String,
    payAmount: { type: String,default:"8" },
    winAmount:{ type: String,default:"0"},
    typeAt:{ type: String,default:"Morning"},
    gameResult:{ type: String,default:"Open"},
    created_At:{ type: Date, required: true, default: Date.now },
    status:{type:Boolean,default:true}
}, {
    timestamps: true
});

module.exports = mongoose.model('game', GameSchema);