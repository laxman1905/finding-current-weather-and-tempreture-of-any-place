const path = require('path');
const http = require('http');
const hbs = require('hbs')
const express = require('express');
const app = express();  // creating app

const templatatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
const adminPath = path.join(__dirname,"../templates/admin");

const staticPath = path.join(__dirname, "../public"); // Get static path
app.use(express.static(staticPath)) // used static path from static directory

 
//-----------------------Using hbs templating--------------------------------------
app.set("view engine", "hbs"); // To use for hbs extention
app.set("views", templatatePath); // views are replaced by templates name
hbs.registerPartials(partialsPath)
hbs.registerPartials(partialsPath)
// hbs.registerPartials(staticPath)
hbs.registerPartials(adminPath)

app.set('view engine', 'html'); // To use for html extention
app.engine('html', require('hbs').__express); // making engine for html file

app.get("/", (req, res)=>{ 
    res.render("index");
})  
 
app.get("/about" ,(req, res)=>{
    res.send('hello from about at port 2000');
    // console.log('hello from express 2000');
})

app.get("/contact" ,(req, res)=>{
    res.render('contact')
    // res.send('hello from contact at port 2000');
    // console.log('hello from express'); 
})
app.get("*", (req, res)=>{ // * is a universal operator to check whhich page dos't defind
    res.render("404", {errorcoment:"Opps page not found"});
})
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