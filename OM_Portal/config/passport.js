const LocalStrategy= require('passport-local').Strategy 
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')   //To compare the hashed password and password entered by user

//Load User Model
const User=require('../models/Users')

module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            //Match user exists
            User.findOne({email:email})
            .then(user=>{
                if(!user)
                return done(null,false,{message:"Email is not registered"});

                //Match pasword after user exists
                bcrypt.compare(password,user.password,(err,isMatch)=>{                                                //user.password is password comming from db as we get it using fond so its hashed one
                    if(err) throw err;
                    if(isMatch)
                    {
                        return done(null,user)
                    }
                    else
                    {
                        return done(null,false,{message:"Password is Incorrect"})
                    }
                })                           

            })
            .catch(err=>console.log(err))
        })
    )

    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}
