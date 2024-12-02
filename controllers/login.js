const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcryptjs = require("bcryptjs");

const login = async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.json({status:"error", error:"Please Enter Your email and Password" });
    else{
        db.query("SELECT * FROM Register WHERE email =? ", [email], async (Err , result) =>{
            if(Err) throw Err;
            if (!result.length || !await bcryptjs.compare(password, result[0].password)) return res.json({status: "error", error: "Incorrect Email or password"})
            else{
                const token = jwt.sign({id:result[0].Id },"vwdqxikuevdckvdcevetcvkee()(E)ECrcjenbxbxdkx",{
                    expiresIn: "90d"
                })
                const cookieOption = {
                    expiresIn:new Date(Date.now() + "90" * 24 * 60 * 1000),
                    httpOnly:true
                }
                res.cookie("userRegistered" , token, cookieOption);
                return res.json({status:"success", success:"User has been logged in"});
            }
        }) 

    }
}


module.exports = login;