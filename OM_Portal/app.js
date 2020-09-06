const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash=require('connect-flash')
const session=require('express-session');
const passport = require('passport');


const app=express()
const PORT= process.env.PORT || 5000

//Passport Config
require('./config/passport')(passport)

//DB Config
const db=require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true })
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))


//EJS
app.use(expressLayouts);
app.set('view engine','ejs')

//BodyParser
app.use(express.urlencoded({extended:false}))   //Body Parser is a part of express no need to explicitly install

//Express-Session middleware
app.use(session({
    secret: 'It is a secret',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))

//Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash())

//Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    res.locals.error=req.flash('error')
    next()
})


//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/user'))

app.listen(PORT,console.log(`Server started on ${PORT}`))
