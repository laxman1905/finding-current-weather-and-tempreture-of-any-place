const express = require('express');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Contact } = require('../../../model/contact');
const { Registration } = require('../../../model/userModel');
const router = new express.Router();
router.use(express.json()) // provide a request data in jsone formate from post request
router.use(express.urlencoded({extended:false})) // get data from request inside the body and post request (and don't show undefind data from post request)
// router.get("/",(req, res)=>{
//     res.send("hello from user router")
// })


//****************************************Registration Start********************************************************* */
router.get("/registration", (req, res)=>{ // For registration pagae opening in the brouser
    res.render('registration')
})

router.post("/registration", async(req, res)=>{ // Get data from post request
    try{
        const password = req.body.password;
        const conformpassword = req.body.conformpassword
        if(password===conformpassword){
            const userRegistered = new Registration({
                    name : req.body.full_name,
                    email : req.body.email,
                    password : req.body.password,
                    conformpassword : req.body.conformpassword,
                    course: req.body.course,
                    mobile : req.body.mobile,
                    gender : req.body.gender,
                    agree : req.body.agree,
            })
        //  Token generation for athentication
            const token = await userRegistered.generateAuthToken();  
            console.log("Registered token is: ",token);

            await userRegistered.save()
            return res.status(200).json({status:true,data:"Data fetches successfully",message:userRegistered})
        }else{
            res.send("password not match")
        }
        const req_data = await req.body.name;
        console.log("hello from registration page");
        // res.send(req_data)
    }catch (error) {
        console.log(error)
        return res.json({status:"Failed", message:error.message })
    }

    // res.render("/login")
    // res.send("hello from user login router")
    // return res.status(200).json({status:true,message:"Data fetches successfully"})

})
//***************************************Registration End********************************************************** */
//***************************************User Login**************************************************************** */
router.post("/login", async(req, res)=>{
    try{
        const user_email = req.body.email;
        const user_password = req.body.password;
        // console.log(user_password);
        const logincredential = await Registration.findOne({email:user_email}) // According to email get all data from registration
        // console.log(logincredential.password);
        const match_password = await bcrypt.compare(user_password, logincredential.password) // if both password is match than go to the next line
       
        const token = await logincredential.generateAuthToken();  
        console.log("Login token is: ",token);

        if(match_password){
            console.log("password match");
            return res.status(200).json({status:true,data:"User login susccessfuly"})
        }else{
            res.send("invalide email or password")
        }
        
        // res.send(logincredential)
        // console.log(logincredential);
        
    }catch (error) {
        console.log(error)
        return res.json({status:"Failed", message:error.message })
    }

    // res.render("/login")
    // res.send("hello from user login router")
    // return res.status(200).json({status:true,message:"Data fetches successfully"})

})
router.get("/login", (req, res)=>{
    res.render('login')
})
// **********************************User Login End****************************************************** */
module.exports = router