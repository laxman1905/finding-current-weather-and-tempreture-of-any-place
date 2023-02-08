const mongoose = require("mongoose")

db = process.env.DATABASE_NAME
mongoose.set("strictQuery", false);
mongoose.connect(db, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successful")
}).catch((err)=>{
    console.log(err)
})
