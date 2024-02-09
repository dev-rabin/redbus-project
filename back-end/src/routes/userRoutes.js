const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const userRouter = express.Router();

userRouter.post("/createUser", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/user", verifyToken, userController.getUserByToken);

module.exports = userRouter;