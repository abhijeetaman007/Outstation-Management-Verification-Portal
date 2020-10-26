const mongoose = require('mongoose');
// const Event = require('./Event')
const UserSchema = new mongoose.Schema({
    userID:{
        type:Number,
        required:true,
        unique:true
    },
    timeStamp:{
        type:Date,
        default: Date.now()
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    isMahe:{
        type:Boolean,
        required:true
    },
    driveLink:{
        type:String,
        required:true,
        unique:true
    },
    verified:{
        type:String,
        enum:['VERIFIED','REJECTED','UNVERIFIED'],
        default:'UNVERIFIED'
    },
    role:{
        type:String,
        default:"User"
    },
    regEvents : [Number]
})

module.exports = User = mongoose.model('User', UserSchema);