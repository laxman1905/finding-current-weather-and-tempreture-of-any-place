const mongoose = require("mongoose")


const validateEmail = (email) => {
    // console.log(email)
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log(re.test(email))
    return re.test(email);
};

const contactSchema = new mongoose.Schema({
    name:{type:String},
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
        ],
    },
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    mobile:{type:Number,required:true,/*unique:true*/ },
})

const Contact = mongoose.model("contact",contactSchema);
module.exports={Contact};