const express =require('express')
const router =express.Router()
const {ensureAuthenticated}=require('../config/auth')
const User=require('../models/Users') 
const mongoose  = require('mongoose')

// //Welcome page
router.get('/',(req,res)=>res.render('welcome'))

//Dashboard and Welcome Page
router.get('/users/dashboard',ensureAuthenticated,(req,res)=>res.render('dashboard',{
    name:req.user.name,
    status:req.user.status
}))
//Admin Dashboard
router.get('/users/admindashboard',ensureAuthenticated,(req,res)=>{
    // console.log(req.user.name)
    compare = (a,b) => {
        let priority = {
            'UNVERIFIED' : 0,
            'VERIFIED' : 1,
            'REJECTED' : 2
        }
        if(priority[a.verified] > priority[b.verified])
            return 1;
        else if(priority[a.verified] < priority[b.verified])
            return -1;
        else
            return 0
    } 
    mongoose.model("User").find({role:'User'},{},{sort:{timeStamp:1}},(err,users)=>{
        if(err) throw err
        else
        {   
            res.render('admindashboard',{
                users:users.sort(compare)
            })
        }
    })
    
    
})
        
    


module.exports=router
