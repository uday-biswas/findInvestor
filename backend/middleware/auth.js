const jwt = require("jsonwebtoken")
require("dotenv").config()

// auth
const auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token ||
            req.body.token ||
            (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);
        // req.header("Authorization").replace("Bearer ", "");
        console.log(`token /cookies: - > ${token}`);
        // if token missing , then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token is missing"
            })
        }

        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(`decode : - > ${JSON.stringify(decode, null, 2)}`);
            req.user = decode
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "token is invalid"
            })
        }


        next()
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "something went wrong while validating token",
            error: err.message
        })
    }
}

module.exports = { auth}