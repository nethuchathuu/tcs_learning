const express = require("express");
const loggedIn = require("../controllers/loggedin")
const router = express.Router();
const logout = require("../controllers/logout")

router.get("/" ,loggedIn, (req, res)=>{
   if(req.user){
    res.render("index",{status:"loggedIn", user:req.user});
   } else{
    res.render("index",{status:"no", user:"nothing"});
   } 
    
})

router.get("/register" , (req, res)=>{
    res.sendFile("register.html", {root:"./public"});
})

router.get("/login" , (req, res)=>{
    res.sendFile("login.html" , {root: "./public/"});
});

router.get("/mainProfile" , (req, res)=>{
    res.render("mainProfile.ejs", {root:"./public"});
})
router.get("/logout", logout)
module.exports = router;