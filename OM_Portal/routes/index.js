const express =require('express')
const router =express.Router()
const {ensureAuthenticated}=require('../config/auth')
const User=require('../models/Users')  //we are importing user model such that we can use methods like find save update delete etc

//Welcome page
router.get('/',(req,res)=>res.render('welcome'))
//Dashboard
router.get('/users/dashboard',ensureAuthenticated,(req,res)=>res.render('dashboard',{
    name:req.user.name,
    status:req.user.status
}))
//Admin Dashboard
router.get('/users/admindashboard',ensureAuthenticated,async (req,res)=>{
    try{
        const user=await User.find()
        console.log("Hello")
        console.log(user.email)
        res.render('admindashboard',{
//          name:req.user.name
//     //  status:req.user.status
})
    }
    catch(err)
    {

    }
}

    // res.render('admindashboard',{
        //  name:req.user.name
     
    
    // status:req.user.status
// })
)


module.exports=router