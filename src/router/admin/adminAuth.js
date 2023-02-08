const express = require('express');
const router = new express.Router();

// router.get("/",(req, res)=>{
//     res.send("hello from admin router")
// })

router.get("/admin",(req, res)=>{
    res.send("hello from admin login router")
})


module.exports = router