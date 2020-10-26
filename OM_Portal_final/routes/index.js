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
    console.log(req.user.name)
    mongoose.model("User").find((err,users)=>{
        if(err) throw err
        else
        {
            res.render('admindashboard',{
                users:users
            })
        }
    })
    
    
})
        
    


module.exports=router
