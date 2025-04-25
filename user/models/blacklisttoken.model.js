const mongoose = require('mongoose')

const blacklisttokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 3600 // 1 h 
    }
} , {
    timestamps : true
})

module.exports = mongoose.model('blacklisttoken' , blacklisttokenSchema)