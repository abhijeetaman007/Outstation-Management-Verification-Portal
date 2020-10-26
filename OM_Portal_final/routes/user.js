const express =require('express')
const router =express.Router()
const bcrypt=require('bcryptjs')
const passport=require('passport')


//User Model
const User=require('../models/Users') 

//Login Page
router.get('/login',(req,res)=>res.render('login'))

// //Register Page
// router.get('/register',(req,res)=>res.render('register'))

// //Register Handle
// router.post('/register',(req,res)=>{
//     // console.log(req.body)
//     // res.send("hello")
//     const {name,email,password,password2,college}=req.body;
//     let errors=[]                                        //we are using an errors array to store different error message which can occur while registering

//     //check required fields
//     if(!name||!email||!password||!password2||!college)
//     errors.push({msg:"Please fill all fields"})

//     //checking password match password and confirm password
//     if(password!=password2)
//     errors.push({msg:"Password do not match"})

//     //Check password length min of 6
//     if(password.length<6){
//         errors.push({msg:"Password should be atleast 6 characters"})
//     }

//     if(errors.length>0)
//     {
//         res.render('register',{        
//             errors,
//             name,
//             email,
//             password,
//             password2,
//             college
//         })
//     }
//     else{
//         //Validation passed
//         User.findOne({email:email})
//         .then(user=>{
//             if(user)
//             {
//                 //User already exists
//                 errors.push({msg:"Email is already registered"})
//                 res.render('register',{
//                     errors,
//                     name,
//                     email,
//                     password,
//                     password2,
//                     college
//                 })
//             }
//             else{
//                 //We reach here when all fields of form are filled and no same user id exists--so now we encrypt the password and create new user 
//                 const newUser= new User({  
//                     name,           
//                     email,
//                     password,
//                     college
//                 }) 
                
//                 //Hash Password
//                 bcrypt.genSalt(10,(err,salt)=>                 //Here using gensalt of bcrypt we are genrating a salt which is used further in hashing 

//                  bcrypt.hash(newUser.password,salt,(error,hash)=>{
//                     if(error) throw error;

//                     //Set password to hashed
//                     newUser.password=hash

//                     //Save User
//                     newUser.save()
//                     .then(user=>{
//                         req.flash('success_msg',"You are now registered and can login")
//                         res.redirect('/users/login')
//                     })
//                     .catch(err=>console.log(err))
//                 }))
//             }
//         })

//     }
// })

//Login Handle
router.post('/login',(req,res,next)=>{
            console.log(req.body.email)
            User.findOne({email:req.body.email})
            .then(user=>{
                console.log(user.role)
                // console.log(user.name)
                // console.log(user)
            if(user.role=="Admin")     //Checking if Admin
            {
                console.log("Inside Admin")
                passport.authenticate('local',{
                
                    successRedirect: './admindashboard',
                    failureRedirect:'./login',
                    failureFlash: true
                })(req,res,next)
            }
            else
            {
                console.log("Inside User")
                passport.authenticate('local',{
                
                    successRedirect: './dashboard',
                    failureRedirect:'./login',
                    failureFlash: true
                })(req,res,next)
            }
            
        })
})


//Logout Handle
router.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success_message',"You are logged out")
    res.redirect('/users/login')
})

//Verification Status Update(By Admin)
router.put('/update/verify/:id',(req,res)=>{
    var id=req.params.id
    console.log("Inside update")
    User.findOne({userID:id},function(err,found){
        if(err)
        {
            console.log(err)
            res.status(500).send()
        }
        else{
            if(!found)
            res.status(404).send()
            else
            {
                console.log(found)
                console.log("present : "+found.verified)
                // found.status=!found.status
                // console.log(req.body)
                found.verified="VERIFIED"
                console.log(found)

                // console.log(req.body)
                found.save((err,updated)=>{
                    if(err)
                    res.status(500).send()
                    else
                    {
                        res.send(updated)
                    }
                })
            }         
        }
    })

    
})


router.put('/update/reject/:id',(req,res)=>{
    var id=req.params.id
    console.log("Inside update")
    User.findOne({userID:id},function(err,found){
        if(err)
        {
            console.log(err)
            res.status(500).send()
        }
        else{
            if(!found)
            res.status(404).send()
            else
            {
                console.log(found)
                console.log("present : "+found.verified)
                // found.status=!found.status
                // console.log(req.body)
                found.verified="REJECTED"
                console.log(found)

                // console.log(req.body)
                found.save((err,updated)=>{
                    if(err)
                    res.status(500).send()
                    else
                    {
                        res.send(updated)
                    }
                })
            }         
        }
    })

    
})

module.exports=router
