const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, password: Npassword, username } = req.body;
    if (!email || !Npassword || !username) {
        return res.json({ status: "error", error: "Please Enter Your email and Password" });
    } else {
        console.log(email);
        db.query('SELECT email FROM Register WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) {
                return res.json({ status: "error", error: "Email has already been registered" });
            } else {
                try {
                    const hashedPassword = await bcrypt.hash(Npassword, 8);
                    console.log(hashedPassword);
                    db.query("INSERT INTO Register SET ?", { email: email, password: hashedPassword, username:username }, (error, results) => {
                        if (error) throw error;
                        return res.json({ status: "success", success: "User has been registered" });
                    });
                } catch (error) {
                    console.error("Error hashing password:", error);
                    return res.status(500).json({ status: "error", error: "Internal Server Error" });
                }
            }
        });
    }
}

module.exports = register;
