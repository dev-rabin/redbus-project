const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env.REACT_JWT_KEY1;

function verifyToken (req , res , next) {
    const token = req.headers.authorization;
    console.log("Verify token :" , token);

    if (!token) {
       return res.json({success : false, message : "No token provided"})
    }

    jwt.verify(token, secretKey, (error, decoded)=> {
       if (error) {
        return res.status(403).json({ message: error, success: false }); 
       }
       console.log("Decoded token :", decoded);
       next();
    });
}

module.exports = verifyToken;