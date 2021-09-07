const mongoose = require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"User"
    },
    status:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    college:{
        type:String,
        required:true,
        default:"Manipal Institute of Technology"
    }   

})

const User=mongoose.model('User',UserSchema)
module.exports = User;