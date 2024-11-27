const db = require("../routes/db-config")
const jwt = require("jsonwebtoken");
const loggedIn = (req, res, next) => {
    if (!req.cookies.userRegistered) return next();
    try {
        const decoded = jwt.verify(req.cookies.userRegistered,"vwdqxikuevdckvdcevetcvkee()(E)ECrcjenbxbxdkx");
        db.query('SELECT * FROM register WHERE id =?',[decoded.id], (err,result)=>{
            if(err)return next();
            req.user = result[0];
            return next();
        })
    } catch (err) {
        if(err) return next()
    }
}

module.exports = loggedIn;