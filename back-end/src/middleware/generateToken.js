const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env.REACT_JWT_KEY1;

function generateToken (userId, userName){
     const payload = {
        userId : userId,
        userName : userName
     };
     const options = {
        expiresIn : "30d"
     };


     return jwt.sign(payload, secretKey,options);
    
}

module.exports = generateToken;