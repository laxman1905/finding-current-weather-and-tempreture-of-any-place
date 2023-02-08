const { string, required } = require("joi");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const validateEmail = (email) => {
    // console.log(email)
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log(re.test(email))
    return re.test(email);
};

const registrationSchema = new mongoose.Schema({
      name : {type:String,required:true},
      email : {
              type:String,
              required:true,
              required: "Email address is required",
              validate: [validateEmail, "Please fill a valid email address"],
              match:    [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address",]
                },
      password:{type:String,required:true},
      conformpassword:{type:String,required:true},
      mobile:{type:String,required:true},
      gender:{type:String,required:true},
      course:{type:String,required:true},
      agree:{type:String,required:true},
      tokens:[{
          token:{
                  type:String,
                  required:true
                }
              }]
})
// Generating Token
registrationSchema.methods.generateAuthToken = async function(){
  try {
    // const token = jwt.sign({_id:this._id},  "laxmankumardaslaxmankumardas")   
       const token = jwt.sign({_id:this._id.toString()},  process.env.SECRET_KEY) //taking id of user and sert a key for security thate is mini 32 charactore
       console.log("han ji token yaha hai: ",token);
       this.tokens = this.tokens.concat({token:token})
       // this.tokens-Come fome Schema and this.tokens.concat({token->(variable where save, come from schema):token->(come from frunt end)})
       await this.save() // Save the token
       return token
      } catch (error) {
      console.log(error);
  }
}


// Encrytion of password
registrationSchema.pre('save',async function(next){ // ranning this part before saving {this is middlewere}
  if(this.isModified('password')){ // Get password from body or modifyed password from body {from input tage}
      // console.log(`pre password",${this.password}`);
      this.password=await bcrypt.hash(this.password,12)
      this.conformpassword = await  bcrypt.hash(this.conformpassword,12)
      // console.log(`after password",${this.password}`);
      // this.conformpassword = undefined; // After that this password will not be save in database
  }
  next()
})

const Registration = mongoose.model("registration",registrationSchema);
module.exports={Registration};