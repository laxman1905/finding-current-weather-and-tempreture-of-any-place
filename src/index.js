require('dotenv').config();
const path = require('path');
const http = require('http');
const hbs = require('hbs')
const express = require('express');
const { Contact } = require('../model/contact.js');
const app = express();  // creating app
var joi = require("joi")
const templatatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
const adminPath = path.join(__dirname,"../templates/admin");

const staticPath = path.join(__dirname, "../public"); // Get static path
app.use(express.static(staticPath)) // used static path from static directory
// Create a new router
const userRouter = require("./router/user/user")

const adminRouter = require("./router/admin/adminAuth")
app.use(userRouter)
app.use(adminRouter)
// app.use(router);



require('../db/connection.js')
//-----------------------Using hbs templating--------------------------------------
app.set("view engine", "hbs"); // To use for hbs extention
app.set("views", templatatePath); // views are replaced by templates name
hbs.registerPartials(partialsPath)
hbs.registerPartials(partialsPath)
// hbs.registerPartials(staticPath)
hbs.registerPartials(adminPath)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'html'); // To use for html extention
app.engine('html', require('hbs').__express); // making engine for html file
const options = {
    abortEarly: false,
    allowUnknown: true, 
    stripUnknown: true,
};



app.get("/", (req, res)=>{ 
    res.render("index");
})  
 
app.get("/about" ,(req, res)=>{
    // res.send('hello from about at port 2000');
    res.render('about')
    // console.log('hello from express 2000');
})


app.post("/contact" ,async (req, res)=>{
    try{
        console.log(req.body);
        const schema = joi.object({
            name:joi.string().required().max(15).min(3).label('name'),
            email:joi.string().email({ tlds: { allow: false } }).required().label('Email id'),
            password:joi.string().required().min(3).max(12).label('password'),
            confirmPassword:joi.string().required().min(3).max(12).label('confirmPassword'),
            mobile:joi.number().required().label('mobile')

        })
        const { error, value } = schema.validate(req.body, options);
        console.log("error,value",error,value)
        
        if (error) return res.status(400).json({ success: false, message:error });
        // else condition
        const {name,email,password,confirmPassword,mobile}=value; // di-structure
        const contact = new Contact({name,email, password,confirmPassword,mobile})
        await contact.save()
        // const con_tact = new contact({
        //     name:"laxman",
        //     email:"lax@gmail.com",
        //     password:"Laxman@111",
        //     confirmPassword:"Laxman@111",
        //     mobile:"1234567890",
        //     active:true    
        // })
        // // const result = await con_tact.save();
        return res.status(200).json({status:true,message:"User registered successfully"})
    } catch (error) {
        console.log(error)
        return res.json({status:"Failed", message:error.message })
    }


    // res.render('contact')
    // res.send('hello from contact at port 2000');
    // console.log('hello from express'); 
})
app.get("/contact" ,async (req, res)=>{
    res.render('contact')
})

app.get("/weather",(req, res)=>{
    res.render('weatherinfo');
})

// app.get("*", (req, res)=>{ // * is a universal operator to check whhich page dos't defind
//     res.render("404", {errorcoment:"Opps page not found"});
// })




app.listen(2000,()=>{ 
    console.log('server running on port 2000');    
})





















// console.log(templatatePath);

// // console.log(path.join(__dirname,'../public'))
// const staticPath = path.join(__dirname,'../public')
// app.use(express.static(staticPath))

// app.get("/" ,(req, res)=>{
//     // By default path selected by """app.use(express.static(staticPath))""" if given otherwise send response from """"res.send('hello from espress at port 2000/home')"""";
//     res.send('hello from espress at port 2000/home');
//     // console.log('hello from express');
// })