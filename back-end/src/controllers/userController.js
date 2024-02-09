const database = require("../conn_mysql");
const jwt = require("jsonwebtoken");
const generateToken = require("../middleware/generateToken");


const userController = {
    createUser: (req, res) => {
        const { name, email, password } = req.body;
        const query = "INSERT INTO user (userName, email, password) VALUES (?, ?, ?)";
        database.query(query, [name, email, password], (error, result) => {
            if (error) {
                if (error.code === "ER_DUP_ENTRY") {
                    res.json({ success: false, message: "Email already registered!" });
                } else {
                    res.json({ success: false, message: "Error creating user:", error });
                    console.error(error);
                }
            } else {
              const token = generateToken(result.userId, result.userName);
              console.log("Create user token : ", token);
                res.json({
                    success: true,
                    message: "User created successfully",
                    id: result.insertId,
                    token : token
                });
                console.log("User created successfully:", result);
            }
        });
    },
    loginUser: (req, res) => {
        const { email, password } = req.body;
        const query = "select * from user where email = ? AND password = ?";
        database.query(query, [email, password], (error, result) => {
          if (error) {
            res.json({ success: false, message: error });
            console.error(error);
          } if (result.length === 0) {
            res.json({message : "User not found"});
          }
          else {
            const user = result[0];
            console.log("Login user data : ", user);
            const token = generateToken(user.userId, user.userName);
            console.log("login user token : ", token);
            res.json({ success: true, message: "User login successfully", token:token });
            console.log(result);
          }
        });
      },

      getUserByToken : (req , res) => {
        const payload = jwt.decode(req.headers.authorization);
        const userId = payload.userId;
        console.log("getUserByToken userId : ", userId);
        const query = "select * from user where userId = ?";
        database.query(query, [userId], (error, result) => {
          if (error) {
            console.error(error);
            res.json({success : false ,message : error})
          }
          if (result.length === 0) {
            res.json({message : "User not found"});
          }
          else {
            const userData = result[0];
            console.log("getUserByToken userData : " , userData);
             res.json({
               success : true,
               message : "User Data get",
               userData : userData
             })
           }
        })
      }
};
 


module.exports = userController;
